package main

import (
	"github.com/gin-gonic/gin"
	"github.com/not09/demo-otw1/controller"
	"github.com/not09/demo-otw1/entity"
	"github.com/not09/demo-otw1/middlewares"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// User Routes
			protected.GET("/users", controller.ListUsers)
			protected.GET("/users/:id", controller.ListUsers)
			protected.GET("/user/:id", controller.GetUser)
			protected.PATCH("/users", controller.UpdateUser)
			protected.DELETE("/users/:id", controller.DeleteUser)

			// Status Routes
			protected.GET("/statuses", controller.ListStatuses)
			protected.GET("/status/:id", controller.GetStatus)
			protected.POST("/statuses", controller.CreateStatus)
			protected.PATCH("/statuses", controller.UpdateStatus)
			protected.DELETE("/statuses/:id", controller.DeleteStatus)

			// Requestcustomer Routes
			protected.GET("/requestcustomers", controller.ListRequestcustomers)
			protected.GET("/requestcustomer/:id", controller.GetRequestcustomer)
			protected.POST("/requestcustomers", controller.CreateRequestcustomer)
			protected.PATCH("/requestcustomers", controller.UpdateRequestcustomer)
			protected.DELETE("/requestcustomers/:id", controller.DeleteRequestcustomer)

			// Track Routes
			protected.GET("/tracks", controller.ListTracks)
			protected.GET("/track/:id", controller.GetTrack)
			protected.POST("/tracks", controller.CreateTrack)
			protected.PATCH("/tracks", controller.UpdateTrack)
			protected.DELETE("/tracks/:id", controller.DeleteTrack)

		}
	}

	// Authentication Routes
	r.POST("/user/login", controller.LoginStudent)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}

}
