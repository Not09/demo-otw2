package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/not09/demo-otw1/entity"
)

// POST /requestcustomers
func CreateRequestcustomer(c *gin.Context) {
	var requestcustomer entity.Requestcustomer
	if err := c.ShouldBindJSON(&requestcustomer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&requestcustomer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": requestcustomer})
}

// GET /requestcustomer/:id
func GetRequestcustomer(c *gin.Context) {
	var requestcustomer entity.Requestcustomer
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM requestcustomers WHERE id = ?", id).Scan(&requestcustomer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": requestcustomer})
}

// GET /requestcustomers
func ListRequestcustomers(c *gin.Context) {
	var requestcustomers []entity.Requestcustomer
	if err := entity.DB().Raw("SELECT * FROM requestcustomers").Scan(&requestcustomers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": requestcustomers})
}

// DELETE /requestcustomers/:id
func DeleteRequestcustomer(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM requestcustomers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requestcustomer not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /requestcustomers
func UpdateRequestcustomer(c *gin.Context) {
	var requestcustomer entity.Requestcustomer
	if err := c.ShouldBindJSON(&requestcustomer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", requestcustomer.ID).First(&requestcustomer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
		return
	}

	if err := entity.DB().Save(&requestcustomer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": requestcustomer})
}
