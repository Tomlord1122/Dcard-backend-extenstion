package api

import (
	db "backend-intern/db/sqlc"
	"backend-intern/util"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

type Server struct {
	query *db.Queries
	route *gin.Engine
	redis *redis.Client
}

func NewServer(query *db.Queries, config util.Config) *Server {
	rdb := redis.NewClient(&redis.Options{
		Addr:         config.RedisAddr,
		Password:     "", // no password set
		DB:           config.RedisDB,
		PoolSize:     100,
		MinIdleConns: 10,
	})

	server := &Server{
		query: query,
		route: gin.Default(),
		redis: rdb,
	}
	// Add routes here
	server.route.POST("/ads", server.CreateAds)
	server.route.GET("/ads", server.ListAds)
	server.route.POST("/ads/random", server.CreateRandomAds)

	return server
}

// errorResponse is a helper function to generate error response
func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}

// Run starts the server
func (server *Server) Start(address string) error {
	return server.route.Run(address)
}
