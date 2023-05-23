package main

import (
	"fmt"
	"log"
	"net/http"
	"qldsvh/common"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

//======================== HeritageType
// `id` bigint unsigned NOT NULL AUTO_INCREMENT,
// `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
// `UrlSlug` text,
// `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
// `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
// `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,

type HeritageType struct {
	common.SQLModel
	Name        string `json:"Name" gorm:"column:Name;"`
	Description string `json:"Description" gorm:"column:Description;"`
	UrlSlug     string `json:"UrlSlug" gorm:"column:UrlSlug;"`
}

func (HeritageType) TableName() string {
	return "HeritageType"
}

type HeritageType_Creation struct {
	Id          int    `json:"-" gorm:"column:id;"`
	Name        string `json:"Name" gorm:"column:Name;"`
	Description string `json:"Description" gorm:"column:Description;"`
	UrlSlug     string `json:"UrlSlug" gorm:"column:UrlSlug;"`
}

func (HeritageType_Creation) TableName() string {
	return HeritageType{}.TableName()
}

type HeritageType_Update struct {
	Name        string `json:"Name" gorm:"column:Name;"`
	Description string `json:"Description" gorm:"column:Description;"`
	UrlSlug     string `json:"UrlSlug" gorm:"column:UrlSlug;"`
}

func (HeritageType_Update) TableName() string {
	return HeritageType{}.TableName()
}

//======================== Heritage
// `id` bigint unsigned NOT NULL AUTO_INCREMENT,
// `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
// `IdHeritageType` int DEFAULT NULL,
// `Description` text,
// `Image` json DEFAULT NULL,
// `Time` datetime DEFAULT NULL,
// `Location` varchar(255) DEFAULT NULL,
// `Status` enum('DangSuaChua','CanSuaChua','BinhThuong') DEFAULT 'BinhThuong',
// `UrlSlug` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
// `ShortDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
// `ImageUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
// `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
// `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,

// HeritageStatus
// type HeritageStatus int

// const (
// 	//in to ascii: giá trị số tự tăng
// 	HeritageConserve  HeritageStatus = iota //0
// 	HeritageThreaten                        //1
// 	HeritageDisappear                       //2
// )

// var allHeritageStatuses = [3]string{"Đang bảo tồn", "Bị đe dọa", "Nguy cơ biến mất"}

// func (item *HeritageStatus) String() string {
// 	//Giá trị của item là int
// 	return allHeritageStatuses[*item]
// }

// func parseStrToHeritageStatus(s string) (HeritageStatus, error) {
// 	for i := range allHeritageStatuses {
// 		if allHeritageStatuses[i] == s {
// 			return HeritageStatus(i), nil
// 		}
// 	}

// 	return HeritageStatus(0), errors.New("invalid status string")
// }

// func (item *HeritageStatus) Scan(value interface{}) error {
// 	bytes, ok := value.([]byte)

// 	if !ok {
// 		return errors.New(fmt.Sprintf("Fail to scan data from sql: %s", value))
// 	}

// 	v, err := parseStrToHeritageStatus(string(bytes))

// 	if err != nil {
// 		return errors.New(fmt.Sprintf("Fail to scan data from sql: %s", value))
// 	}

// 	*item = v

// 	return nil
// }

// func (item *HeritageStatus) Value() (driver.Value, error) {
// 	if item == nil {
// 		return nil, nil
// 	}

// 	return item.String(), nil
// }

// func (item *HeritageStatus) MarshalJSON() ([]byte, error) {
// 	if item == nil {
// 		return nil, nil
// 	}

// 	return []byte(fmt.Sprintf("\"%s\"", item.String())), nil
// }

// func (item *HeritageStatus) UnmarshalJSON(data []byte) error {
// 	str := strings.ReplaceAll(string(data), "\"", "")

// 	v, err := parseStrToHeritageStatus(str)

// 	if err != nil {
// 		return err
// 	}

// 	*item = v

// 	return nil
// }

type Heritage struct {
	common.SQLModel
	Name             string     `json:"Name" gorm:"column:Name;"`
	IdHeritageType   int        `json:"IdHeritageType" gorm:"column:IdHeritageType;"`
	Description      string     `json:"Description" gorm:"column:Description;"`
	ShortDescription string     `json:"ShortDescription" gorm:"column:ShortDescription;"`
	Location         string     `json:"Location" gorm:"column:Location;"`
	ImageUrl         string     `json:"ImageUrl" gorm:"column:ImageUrl;"`
	UrlSlug          string     `json:"UrlSlug" gorm:"column:UrlSlug;"`
	Time             *time.Time `json:"Time" gorm:"column:Time;"`
	Status           string     `json:"Status" gorm:"column:Status;"`
}

func (Heritage) TableName() string {
	return "Heritage"
}

type Heritage_Creation struct {
	Id               int        `json:"id" gorm:"column:id;"`
	Name             string     `json:"Name" gorm:"column:Name;"`
	IdHeritageType   int        `json:"IdHeritageType" gorm:"column:IdHeritageType;"`
	Description      string     `json:"Description" gorm:"column:Description;"`
	ShortDescription string     `json:"ShortDescription" gorm:"column:ShortDescription;"`
	Location         string     `json:"Location" gorm:"column:Location;"`
	ImageUrl         string     `json:"ImageUrl" gorm:"column:ImageUrl;"`
	UrlSlug          string     `json:"UrlSlug" gorm:"column:UrlSlug;"`
	Time             *time.Time `json:"Time" gorm:"column:Time;"`
	Status           string     `json:"Status" gorm:"column:Status;"`
}

func (Heritage_Creation) TableName() string {
	return Heritage{}.TableName()
}

type Heritage_Update struct {
	Name             string     `json:"Name" gorm:"column:Name;"`
	IdHeritageType   int        `json:"IdHeritageType" gorm:"column:IdHeritageType;"`
	Description      string     `json:"Description" gorm:"column:Description;"`
	ShortDescription string     `json:"ShortDescription" gorm:"column:ShortDescription;"`
	Location         string     `json:"Location" gorm:"column:Location;"`
	ImageUrl         string     `json:"ImageUrl" gorm:"column:ImageUrl;"`
	UrlSlug          string     `json:"UrlSlug" gorm:"column:UrlSlug;"`
	Time             *time.Time `json:"Time" gorm:"column:Time;"`
	Status           string     `json:"Status" gorm:"column:Status;"`
}

func (Heritage_Update) TableName() string {
	return Heritage{}.TableName()
}

type Heritage_FullInfo struct {
	common.SQLModel
	Name             string     `json:"Name" gorm:"column:Name;"`
	IdHeritageType   int        `json:"IdHeritageType" gorm:"column:IdHeritageType;"`
	HeritageTypeName string     `json:"HeritageTypeName" gorm:"column:HeritageTypeName;"`
	Description      string     `json:"Description" gorm:"column:Description;"`
	ShortDescription string     `json:"ShortDescription" gorm:"column:ShortDescription;"`
	Location         string     `json:"Location" gorm:"column:Location;"`
	ImageUrl         string     `json:"ImageUrl" gorm:"column:ImageUrl;"`
	UrlSlug          string     `json:"UrlSlug" gorm:"column:UrlSlug;"`
	Time             *time.Time `json:"Time" gorm:"column:Time;"`
	Status           string     `json:"Status" gorm:"column:Status;"`
}

func main() {
	//=================================================== Kết nối db
	// dsn := os.Getenv("DB_CONN_STR")
	DB_CONN_STR := "root:my-secret-pw@tcp(127.0.0.1:3306)/QLDSVH?charset=utf8mb4&parseTime=True&loc=Local"
	dsn := DB_CONN_STR
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		//Log lỗi và thoát chương trình
		log.Fatalln(err)
	}

	fmt.Println(db)

	//=================================================== Khởi tạo
	//now := time.Now().UTC()

	// item := LoaiDiSan{
	// 	Id:        1,
	// 	TenLoai:   "Di sản văn hóa phi vật thể",
	// 	CreatedAt: &now,
	// 	UpdateAt:  &now,
	// }

	// //=================================================== Chuyển struct thành json
	// jsonData, err := json.Marshal(item)

	// if err != nil {
	// 	fmt.Println(err)
	// 	return
	// }

	// fmt.Println(string(jsonData))

	// //=================================================== Chuyển từ json về struct
	// jsonStr := `{"Id":1,"TenLoai":"Di sản văn hóa phi vật thể","created_at":"2023-04-24T21:00:42.3242677Z","update_at":null}`

	// var item2 LoaiDiSan

	// if err := json.Unmarshal([]byte(jsonStr), &item2); err != nil {
	// 	fmt.Println(err)
	// 	return
	// }

	// fmt.Println(item2)

	//=================================================== Http server
	r := gin.Default()
	r.Use(addCorsHeaders())

	//CRUD: create, read, update, delete
	// POST/v1/loaidisan -> tạo item
	// GET/v1/loaidisan/?page=1 -> lấy danh sách
	// GET/v1/loaidisan/:id -> Lấy chi tiết item
	// PUT/v1/loaidisan/:id -> Update item
	// DELETE/v1/loaidisan/:id -> Xóa item

	v1 := r.Group("/v1")
	{
		HeritageType := v1.Group("/heritage-type")
		{
			HeritageType.POST("", Create_HeritageType(db))
			HeritageType.GET("", List_HeritageType(db))
			HeritageType.GET("/:id", Get_HeritageType(db))
			HeritageType.PATCH("/:id", Update_HeritageType(db))
			HeritageType.DELETE("/:id", Delete_HeritageType(db))
		}

		Heritage := v1.Group("/heritage")
		{
			Heritage.POST("", Create_Heritage(db))
			Heritage.GET("", List_Heritage(db))
			Heritage.GET("/full-info", List_Heritage_FullInfo(db))
			Heritage.GET("/:id", Get_Heritage(db))
			Heritage.PATCH("/:id", Update_Heritage(db))
			Heritage.DELETE("/:id", Delete_Heritage(db))
			//Heritage.GET("/:id/heritage-type", Get_HeritageTypeById(db))
		}
	}

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Server đang chạy ở port 3000",
			//"message": item,
		})
	})

	r.Run(":3000") // 0.0.0.0:8080 (for windows "localhost:8080")
}

// ======================== HeritageType
func Create_HeritageType(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data HeritageType_Creation

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := db.Create(&data).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data.Id))
	}
}

func Get_HeritageType(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data HeritageType

		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		//data.Id = id

		if err := db.Where("Id = ?", id).First(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data))
	}
}

func Update_HeritageType(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data HeritageType_Update

		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := db.Where("Id = ?", id).Updates(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(true))
	}
}

func Delete_HeritageType(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		// // Xóa nhưng ko xóa hẳn dưới db
		// if err := db.Table(LoaiDiSan{}.TableName()).Where("Id = ?", id).Updates(map[string]interface{}{
		// 	"status": "deleted",
		// }).Error; err != nil {
		// 	c.JSON(http.StatusBadRequest, gin.H{
		// 		"error": err.Error(),
		// 	})

		// 	return
		// }

		// Xóa hẳn dưới db
		if err := db.Table(HeritageType{}.TableName()).Where("Id = ?", id).Delete(nil).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(true))
	}
}

func List_HeritageType(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var paging common.Paging

		if err := c.ShouldBind(&paging); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		paging.Process()

		var result []HeritageType

		if err := db.Table(HeritageType{}.TableName()).Count(&paging.Total).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		// db = db.Where("status <> ?", "value")

		if err := db.Order("id desc").
			Offset((paging.Page - 1) * paging.Limit).
			Limit(paging.Limit).
			Find(&result).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.NewSuccessResponse(result, paging, nil))
	}
}

// ======================== Di sản văn hóa
func Create_Heritage(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data Heritage_Creation

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := db.Create(&data).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data.Id))
	}
}

func Get_Heritage(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data Heritage

		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		//data.Id = id

		if err := db.Where("Id = ?", id).First(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data))
	}
}

// func Get_HeritageTypeById(db *gorm.DB) func(*gin.Context) {
// 	return func(c *gin.Context) {
// 		//ascii to int
// 		id, err := strconv.Atoi(c.Param("id"))

// 		if err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{
// 				"error": err.Error(),
// 			})

// 			return
// 		}

// 		var result struct {
// 			Id               int
// 			Name             string
// 			HeritageTypeName string
// 		}

// 		if err := db.Table("Heritage").
// 			Select("Heritage.id AS Id, Heritage.Name AS Name, HeritageType.Name AS HeritageTypeName").
// 			Joins("JOIN HeritageType ON Heritage.IdHeritageType = HeritageType.id").
// 			Where("Heritage.id = ?", id).
// 			First(&result).Error; err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{
// 				"error": err.Error(),
// 			})

// 			return
// 		}

// 		c.JSON(http.StatusOK, common.SimpleSuccessResponse(result))
// 	}
// }

func Update_Heritage(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data Heritage_Update

		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := db.Where("Id = ?", id).Updates(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(true))
	}
}

func Delete_Heritage(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		// // Xóa nhưng ko xóa hẳn dưới db
		// if err := db.Table(LoaiDiSan{}.TableName()).Where("Id = ?", id).Updates(map[string]interface{}{
		// 	"status": "deleted",
		// }).Error; err != nil {
		// 	c.JSON(http.StatusBadRequest, gin.H{
		// 		"error": err.Error(),
		// 	})

		// 	return
		// }

		// Xóa hẳn dưới db
		if err := db.Table(Heritage{}.TableName()).Where("Id = ?", id).Delete(nil).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(true))
	}
}

func List_Heritage(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var paging common.Paging

		if err := c.ShouldBind(&paging); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		paging.Process()

		var result []Heritage

		if err := db.Table(Heritage{}.TableName()).Count(&paging.Total).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		// db = db.Where("status <> ?", "value")

		if err := db.Order("id desc").
			Offset((paging.Page - 1) * paging.Limit).
			Limit(paging.Limit).
			Find(&result).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.NewSuccessResponse(result, paging, nil))
	}
}

func List_Heritage_FullInfo(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var paging common.Paging

		if err := c.ShouldBind(&paging); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		paging.Process()

		var result []Heritage_FullInfo

		if err := db.Table(Heritage{}.TableName()).Count(&paging.Total).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		// db = db.Where("status <> ?", "value")

		if err := db.Table("Heritage").
			Select("Heritage.*, HeritageType.Name AS HeritageTypeName").
			Joins("JOIN HeritageType ON Heritage.IdHeritageType = HeritageType.id").
			Order("id desc").
			Offset((paging.Page - 1) * paging.Limit).
			Limit(paging.Limit).
			Find(&result).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.NewSuccessResponse(result, paging, nil))
	}
}

// ======================== Config Server
func addCorsHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST, HEAD, PATCH, OPTIONS, GET, PUT, POST, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
