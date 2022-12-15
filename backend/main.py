from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import queries
import boto3

# in terminal uvicorn main:app --reload
app = FastAPI(docs_url="/")

# NOTE: Requires that you've set up your ~/.aws/credentials file correctly.

# Create an EC2 client
ec2 = boto3.client("ec2")

# Configure S3 bucket
S3_BUCKET_NAME = "Your Bucket Name Here"

origins = [
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
def hello():
    return "hi"

@app.get("/actors")
def get_actors():
    actors_list = queries.get_actors()
    return {"actors": actors_list}

@app.get("/time")
def get_time():
    return {"currentTime": datetime.now()}

@app.get("/ec2")
def list_ec2():
    instance_list = []
    # List running instances
    response = ec2.describe_instances(
        Filters=[{"Name": "instance-state-name", "Values": ["running"]}]
    )
    for reservation in response["Reservations"]:
        for instance in reservation["Instances"]:
            # Save the instance ID and other metadata
            inst = {}
            inst["instance_id"] = instance["InstanceId"]
            inst["instance_type"] = instance["InstanceType"]
            inst["instance_image_id"] = instance["ImageId"]
            inst["instance_vpc_id"] = instance["VpcId"]
            inst["instance_subnet_id"] = instance["SubnetId"]
            inst["instance_security_groups"] = instance["SecurityGroups"][0][
                "GroupName"
            ]
            inst["instance_key_pair_name"] = instance["KeyName"]
            instance_list.append(inst)
    return instance_list

@app.post("/upload")
async def upload(file: UploadFile):
    # Connect to S3
    s3 = boto3.client("s3")
    # print(file)
    # Upload the file to the S3 bucket
    s3.upload_fileobj(file.file, S3_BUCKET_NAME, file.filename)

    return {"message": "File successfully uploaded to S3 bucket"}
