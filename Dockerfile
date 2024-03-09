FROM golang:1.21 as builder

# Set the current working directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod ./go.mod
COPY go.sum ./go.sum

# Download dependencies
RUN go mod download

COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o server .

FROM scratch

COPY --from=builder /app/server /server
COPY --from=builder /app/app.env /app.env
COPY --from=builder /app/nginx.conf /nginx.conf
ENV PORT 8080

EXPOSE 8080

CMD ["/server"]