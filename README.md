# Dcard-backend-extenstion

此 project 試著把 2024 Dcard Assignment 做延伸，嘗試將原本的設計做 horizontal scale up，以下圖為例將新增多個 goserver，以及使用 Nginx 做 load balance。並最後將所有服務 Dockerize 包成一個 container。

實際是可以運作的，但在 loadbalance 以及其他議題下，目前無法達到 10000RPS。

![](/asset/scale.jpeg)
想法延伸

## Getting Started

```
make docker
```
