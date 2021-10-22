package main

import (
	"github.com/gin-gonic/gin"
	"github.com/phu024/sa-64/controller"
	"github.com/phu024/sa-64/entity"
	"github.com/phu024/sa-64/middlewares"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{

			//Gender Routes
			protected.GET("/genders", controller.ListGenders)
			protected.GET("/gender/:id", controller.GetGender)
			protected.POST("/genders", controller.CreateGenders)
			protected.PATCH("/genders", controller.UpdateGender)
			protected.DELETE("/genders/:id", controller.DeleteGender)

			// allergy Routes
			protected.GET("/allergys", controller.ListAllergys)
			protected.GET("/allergy/:id", controller.GetAllergy)
			protected.POST("/allergys", controller.CreateAllergys)
			protected.PATCH("/allergys", controller.UpdateAllergy)
			protected.DELETE("/allergys/:id", controller.DeleteAllergy)

			// underlying_disease Routes
			protected.GET("/underlying_diseases", controller.ListUnderlying_diseases)
			protected.GET("/underlying_disease/:id", controller.GetUnderlying_disease)
			protected.POST("/underlying_diseases", controller.CreateUnderlying_diseases)
			protected.PATCH("/underlying_diseases", controller.UpdateUnderlying_disease)
			protected.DELETE("/underlying_diseases/:id", controller.DeleteUnderlying_disease)

			// recorder Routes
			protected.GET("/recorders", controller.ListRecorder)
			protected.GET("/recorder/:id", controller.GetRecorder)
			protected.POST("/recorders", controller.CreateRecorders)
			protected.PATCH("/recorders", controller.UpdateRecorder)
			protected.DELETE("/recorders/:id", controller.DeleteRecorder)

			// patient Routes
			protected.GET("/patients", controller.ListPatients)
			protected.GET("/patient/:id", controller.GetPatient)
			protected.POST("/patients", controller.CreatePatients)
			protected.PATCH("/patients", controller.UpdatePatient)
			protected.DELETE("/patients/:id", controller.DeletePatient)
		}
	}

	// User Routes
	//r.POST("/patients", controller.CreatePatients)

	// Authentication Routes
	r.POST("/login", controller.Login)

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
