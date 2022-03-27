package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/not09/demo-otw1/entity"
)

// POST /tracks
func CreateTrack(c *gin.Context) {

	var track entity.Track
	var user entity.User
	var status entity.Status
	var requestcustomer entity.Requestcustomer

	if err := c.ShouldBindJSON(&track); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", track.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", track.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", track.RequestcustomerID).First(&requestcustomer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requestcustomer not found"})
		return
	}

	tr := entity.Track{
		User:            user,
		Status:          status,
		Requestcustomer: requestcustomer,
		TimeRecived:     track.TimeRecived,
		Labremark:       track.Labremark,
	}


	if err := entity.DB().Create(&tr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tr})
}

// GET /track/:id
func GetTrack(c *gin.Context) {
	var track entity.Track
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Status").Preload("Requestcustomer").Raw("SELECT * FROM tracks WHERE id = ?", id).Find(&track).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": track})
}

// GET /tracks
func ListTracks(c *gin.Context) {
	var tracks []entity.Track
	if err := entity.DB().Preload("User").Preload("Status").Preload("Requestcustomer").Raw("SELECT * FROM tracks").Find(&tracks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tracks})
}

// DELETE /tracks/:id
func DeleteTrack(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM tracks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "track not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /tracks
func UpdateTrack(c *gin.Context) {
	var track entity.Track
	if err := c.ShouldBindJSON(&track); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", track.ID).First(&track); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "track not found"})
		return
	}

	if err := entity.DB().Save(&track).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": track})
}
