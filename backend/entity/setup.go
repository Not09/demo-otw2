package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("demo-otw1.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	database.AutoMigrate(
		&Track{},
		&User{},
		&Requestcustomer{},
		&Status{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	user1 := User{
		GID:      "941099",
		Name:     "Not",
		Position: "engineer",
		Password: string(password),
	}
	db.Model(&User{}).Create(&user1)

	user2 := User{
		GID:      "900000",
		Name:     "Noey",
		Position: "lab",
		Password: string(password),
	}
	db.Model(&User{}).Create(&user2)

	user3 := User{
		GID:      "999999",
		Name:     "P'jom",
		Position: "manager",
		Password: string(password),
	}
	db.Model(&User{}).Create(&user3)

	state1 := Status{
		State: "wait",
	}
	db.Model(&Status{}).Create(&state1)

	state2 := Status{
		State: "recive",
	}
	db.Model(&Status{}).Create(&state2)

	Requestcustomerg1 := Requestcustomer{
		Team:          "DRIVE PE",
		Source:        "DRIVE",
		FW:            "FW2236",
		Timerequested: time.Now(),
		Product:       "LongsPeak",
		QTY:           1,
		Level:         "HSA",
		ID_Ar:         "AR1858110",
		Drive_sn:      "ZVT0Qy4G",
		HSA_sn:        "BFATQCZGB",
		Faliure_mode:  "spiral scratch",
		Failhead:      "19",
		Engowner:      "Thunchanok/4854",
		Sender:        "Saowarod/6435",
		remark:      "",
	}
	db.Model(&Requestcustomer{}).Create(&Requestcustomerg1)

	Requestcustomerg2 := Requestcustomer{
		Team:          "ASE",
		Source:        "Reliability",
		FW:            "FW2236",
		Timerequested: time.Now(),
		Product:       "LongsPeak",
		QTY:           1,
		Level:         "HSA",
		ID_Ar:         "AR1858920",
		Drive_sn:      "ZVT0SCA6",
		HSA_sn:        "DEL3QA7ST",
		Faliure_mode:  "H.Deg.rd",
		Failhead:      "all hd",
		Engowner:      "Suchart/3192",
		Sender:        "Phitchayanin / 3297",
		remark:        "",
	}
	db.Model(&Requestcustomer{}).Create(&Requestcustomerg2)

	Requestcustomerg3 := Requestcustomer{
		Team:          "HME",
		Source:        "Drive ",
		FW:            "FW2237",
		Timerequested: time.Now(),
		Product:       "LongsPeakBP",
		QTY:           1,
		Level:         "HSA",
		ID_Ar:         "AR1859719",
		Drive_sn:      "ZX2007RT",
		HSA_sn:        "BEMYQDGS0",
		Faliure_mode:  "EC10591",
		Failhead:      "4",
		Engowner:      "Penpathu/6119",
		Sender:        "Waraporn/4518",
		remark:        "",
	}
	db.Model(&Requestcustomer{}).Create(&Requestcustomerg3)

	Requestcustomerg4 := Requestcustomer{
		Team:          "ASE",
		Source:        "Customer ",
		FW:            "FW2238",
		Timerequested: time.Now(),
		Product:       "Rosewood",
		QTY:           1,
		Level:         "HSA",
		ID_Ar:         "AR1861588",
		Drive_sn:      "ZDZLSTZJ",
		HSA_sn:        "TFBKDBG8Z",
		Faliure_mode:  "High PES - Other",
		Failhead:      "3",
		Engowner:      "Jakkaphan C/4810",
		Sender:        "Phitchayanin / 3297",
		remark:        "",
	}
	db.Model(&Requestcustomer{}).Create(&Requestcustomerg4)

	Requestcustomerg5 := Requestcustomer{
		Team:          "ASE",
		Source:        "Reliability ",
		FW:            "FW2238",
		Timerequested: time.Now(),
		Product:       "EagleRayBP",
		QTY:           1,
		Level:         "HSA",
		ID_Ar:         "AR1861304 ",
		Drive_sn:      "ZMQ01NPC",
		HSA_sn:        "DEK6Q1TSP",
		Faliure_mode:  "H.Deg.WR",
		Failhead:      "3",
		Engowner:      "Jakkaphan C/4810",
		Sender:        "Phitchayanin / 3297",
		remark:        "",
	}
	db.Model(&Requestcustomer{}).Create(&Requestcustomerg5)





}