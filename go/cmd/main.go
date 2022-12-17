package main

import (
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func main() {
	sess := session.Must(
		session.NewSession(
			&aws.Config{
				Credentials:      credentials.NewStaticCredentials("nutmeg", "gidaifes", ""),
				Endpoint:         aws.String("http://localhost:9000"),
				Region:           aws.String("ap-northeast-1"),
				S3ForcePathStyle: aws.Bool(true),
			}))
	svc := s3.New(sess)

	bucket := "example"

	exists, err := existsBucket(svc, bucket)
	if err != nil {
		fmt.Printf("failed to exists bucket: %s\n", err)
		os.Exit(1)
	}

	if exists {
		if err := deleteBucket(svc, bucket); err != nil {
			fmt.Printf("failed to delete bucket: %s\n", err)
			os.Exit(1)
		}
	}

	if err := createBucket(svc, bucket); err != nil {
		fmt.Printf("failed to create bucket: %s\n", err)
		os.Exit(1)
	}
}

func existsBucket(svc *s3.S3, bucket string) (bool, error) {
	_, err := svc.HeadBucket(&s3.HeadBucketInput{
		Bucket: aws.String(bucket),
	})
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case "NotFound":
				return false, nil
			default:
				return false, err
			}
		} else {
			return false, err
		}
	}
	return true, nil
}

func deleteBucket(svc *s3.S3, bucket string) error {
	_, err := svc.DeleteBucket(&s3.DeleteBucketInput{
		Bucket: aws.String(bucket),
	})
	return err
}

func createBucket(svc *s3.S3, bucket string) error {
	_, err := svc.CreateBucket(&s3.CreateBucketInput{
		Bucket: aws.String(bucket),
	})
	return err
}