package routers

import (
	"heritage-management/api/controllers"

	"github.com/gin-gonic/gin"
)

// SetupRouter thiết lập router cho web server
func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Routes
	v1 := r.Group("/api/v1")
	{
		heritage := v1.Group("/heritage")
		{
			heritage.GET("", controllers.GetAllHeritages)
			heritage.GET("/:id", controllers.GetHeritageByID)
			heritage.POST("", controllers.CreateHeritage)
			heritage.PUT("/:id", controllers.UpdateHeritage)
			heritage.DELETE("/:id", controllers.DeleteHeritage)
		}
		heritage_type := v1.Group("/heritage_type")
		{
			heritage_type.GET("", controllers.GetAllHeritageTypes)
			heritage_type.GET("/:id", controllers.GetHeritageTypeByID)
			heritage_type.POST("", controllers.CreateHeritageType)
			heritage_type.PUT("/:id", controllers.UpdateHeritageType)
		}
	}

	return r
}
