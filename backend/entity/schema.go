package entity

import (
	"time"

	"gorm.io/gorm"
)

type Requestcustomer struct {
	gorm.Model

	Team          string
	Source        string
	FW            string
	Timerequested time.Time
	Product       string
	QTY           int
	Level         string
	ID_Ar         string `gorm:"uniqueIndex"`
	Drive_sn      string
	HSA_sn        string
	Faliure_mode  string
	Failhead      string
	Engowner      string
	Sender        string
	remark        string

	Track []Track `gorm:"foreignKey:RequestcustomerID"`
}

type User struct {
	gorm.Model

	GID      string `gorm:"uniqueIndex"`
	Name     string
	Password string
	Position string

	Track []Track `gorm:"foreignKey:UserID"`
}

type Status struct {
	gorm.Model

	State string

	Track []Track `gorm:"foreignKey:StatusID"`
}

type Track struct {
	gorm.Model

	TimeRecived time.Time
	Labremark   string

	UserID *uint
	User   User `gorm:"references:id" valid:"-"`

	StatusID *uint
	Status   Status `gorm:"references:id" valid:"-"`

	RequestcustomerID *uint
	Requestcustomer   Requestcustomer `gorm:"references:id" valid:"-"`
}
