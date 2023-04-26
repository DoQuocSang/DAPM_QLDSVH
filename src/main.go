package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type TodoItem struct {
	Id           int        `json:"id"`
	Ten          string     `json:"ten"`
	DiaChi       string     `json:"diachi"`
	Email        string     `json:"email"`
	MatKhau      string     `json:"matkhau"`
	QuyenTruyCap bool       `json:"quyentruycap"`
	CreateAt     *time.Time `json:"create_at"`
	UpdateAt     *time.Time `json:"update_at,omitempty"`
}

type TodoItemCreation struct {
	Ten          string     `json:"ten"`
	Email        string     `json:"email"`
	MatKhau      string     `json:"matkhau"`
	QuyenTruyCap bool       `json:"quyentruycap"`
}

func main() {
	dsn := os.Getenv("DB_CONN_STR")
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(db)

	now := time.Now().UTC()

	item := TodoItem{
		Id:           1,
		Ten:          "hoaiTrang",
		DiaChi:       "hhhh",
		Email:        "2014496@dlu.edu.vn",
		MatKhau:      "1234567",
		QuyenTruyCap: true,
		CreateAt:     &now,
		UpdateAt:     &now,
	}

	r := gin.Default()

	//CRUD: Create,Read,update,Delete
	//POST /v1/items(create a new item)
	//GET /v1/items(list items) /v1/items?page=1
	//GET /v1/items/:id(get item detail by id)
	//(PUT||PATCH) /v1/items/:id(update item by id)
	//DELETE /v1/items/:id(delete item by id)

	v1:=r.Group(relativePath"/v1")
	{
		items:=v1.Group(relativePath:"/items")
		{
			items.POST(relativePath:"", CreateItem())
			items.GET(relativePath:"")
			items.GET(relativePath:"/:id")
			items.PATCH(relativePath:"/:id")
			items.DELETE(relativePath:"/:id")

		}
	}

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": item,
		})
	})

	r.Run(":3000")
}

func CreateItem() func(*gin.Context){
	return func(c *gin.Context) {

	}
}
