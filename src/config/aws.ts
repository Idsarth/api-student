import AWS from 'aws-sdk'

import { AWS_ID, AWS_SECRET } from '../env'

export const s3 = new AWS.S3({
  credentials: {
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET
  }
})
