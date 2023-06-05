package config

type AppConfig struct {
	Server struct {
		Address string
	}
	Database struct {
		Host     string
		Port     string
		Name     string
		User     string
		Password string
	}
	Port string
}

func GetAppConfig() *AppConfig {
	return &AppConfig{
		Server: struct {
			Address string
		}{
			Address: ":8080",
		},
		Database: struct {
			Host     string
			Port     string
			Name     string
			User     string
			Password string
		}{
			Host:     "localhost",
			Port:     "3306",
			Name:     "QLDSVH_Web",
			User:     "root",
			Password: "my-secret-pw",
		},
		Port: "8080",
	}
}
