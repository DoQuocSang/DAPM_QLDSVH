package routers

import (
	"heritage-management/api/config"
	"heritage-management/api/controllers"

	"github.com/gin-gonic/gin"
)

// SetupRouter thiết lập router cho web server
func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Thêm CORS middleware
	r.Use(config.AddCorsHeaders())

	// Routes
	v1 := r.Group("/api/v1")
	{
		heritage := v1.Group("/heritage")
		{
			heritage.GET("", controllers.GetPagedHeritages)
			heritage.GET("/:id", controllers.GetHeritageByID)
			heritage.POST("", controllers.CreateHeritage)
			heritage.PUT("/:id", controllers.UpdateHeritage)
			heritage.DELETE("/:id", controllers.DeleteHeritage)
		}
		heritage_type := v1.Group("/heritage-type")
		{
			heritage_type.GET("", controllers.GetPagedHeritageTypes)
			heritage_type.GET("/:id", controllers.GetHeritageTypeByID)
			heritage_type.POST("", controllers.CreateHeritageType)
			heritage_type.PUT("/:id", controllers.UpdateHeritageType)
			heritage_type.DELETE("/:id", controllers.DeleteHeritageType)
		}
		management_unit := v1.Group("/management-unit")
		{
			management_unit.GET("", controllers.GetPagedManagementUnits)
			management_unit.GET("/:id", controllers.GetManagementUnitByID)
			management_unit.POST("", controllers.CreateManagementUnit)
			management_unit.PUT("/:id", controllers.UpdateManagementUnit)
			management_unit.DELETE("/:id", controllers.DeleteManagementUnit)
		}
		location := v1.Group("/location")
		{
			location.GET("", controllers.GetPagedLocations)
			location.GET("/:id", controllers.GetLocationByID)
			location.POST("", controllers.CreateLocation)
			location.PUT("/:id", controllers.UpdateLocation)
			location.DELETE("/:id", controllers.DeleteLocation)
		}
		user := v1.Group("/user")
		{
			user.GET("", controllers.GetPagedUsers)
			user.GET("/:id", controllers.GetUserByID)
			user.POST("", controllers.RegisterUser)
			user.PUT("/:id", controllers.UpdateUser)
			user.DELETE("/:id", controllers.DeleteUser)
		}
		heritage_category := v1.Group("/heritage-category")
		{
			heritage_category.GET("", controllers.GetPagedHeritageCategories)
			heritage_category.GET("/:id", controllers.GetHeritageCategoryByID)
			heritage_category.POST("", controllers.CreateHeritageCategory)
			heritage_category.PUT("/:id", controllers.UpdateHeritageCategory)
			heritage_category.DELETE("/:id", controllers.DeleteHeritageCategory)
		}
	}

	return r
}
