# CRUD API Documentation for Zones and Store Types

## Base URL
`http://localhost:8001/v1`

## Authentication
All endpoints require Bearer token authentication:
```
Authorization: Bearer <token>
```

To get a token, login with:
```bash
curl -X POST http://localhost:8001/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "admin123"}'
```

## Zone Endpoints

### 1. Create Zone
**POST** `/zones`

**Body:**
```json
{
  "name": "Zone Name",
  "description": "Zone description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Zone Name",
    "description": "Zone description",
    "createdAt": "2025-07-29T17:40:27.023Z",
    "updatedAt": "2025-07-29T17:40:27.023Z"
  }
}
```

### 2. List All Zones
**GET** `/zones`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "North Zone",
      "description": "Northern business district",
      "createdAt": "2025-07-29T17:40:27.000Z",
      "updatedAt": "2025-07-29T17:40:27.000Z",
      "deletedAt": null,
      "store_types": [...]
    }
  ]
}
```

### 3. Get Single Zone
**GET** `/zones/{id}`

**Response:** Same as list but single object

### 4. Update Zone
**PUT** `/zones/{id}`

**Body:**
```json
{
  "name": "Updated Zone Name",
  "description": "Updated description"
}
```

### 5. Delete Zone
**DELETE** `/zones/{id}`

**Response:**
```json
{
  "success": true,
  "data": {
    "deleted": true
  }
}
```

## Store Type Endpoints

### 1. Create Store Type
**POST** `/store-types`

**Content-Type:** `application/json` or `multipart/form-data` (for image upload)

**Body (JSON):**
```json
{
  "name": "Store Type Name",
  "description": "Store description",
  "store_type_description": "Detailed description",
  "store_ui": "UI theme configuration",
  "zone_id": 1,
  "title": "Store title",
  "sub_title": "Store subtitle",
  "offer": "Special offer text",
  "radius": 2.5
}
```

**Body (Form Data with image):**
```bash
curl -X POST http://localhost:8001/v1/store-types \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=Coffee Shop" \
  -F "description=Premium coffee" \
  -F "zone_id=1" \
  -F "radius=2.5" \
  -F "image=@/path/to/image.png"
```

### 2. List All Store Types
**GET** `/store-types`

**Query Parameters:**
- `zone_id` (optional): Filter by zone ID

**Examples:**
- All store types: `GET /store-types`
- By zone: `GET /store-types?zone_id=1`

### 3. Get Single Store Type
**GET** `/store-types/{id}`

### 4. Update Store Type
**PUT** `/store-types/{id}`

**Content-Type:** `application/json` or `multipart/form-data` (for image upload)

**Body:** Same as create, all fields optional

### 5. Delete Store Type
**DELETE** `/store-types/{id}`

## Data Models

### Zone Model
```
id: Integer (Primary Key, Auto Increment)
name: String(191) - Unique, Required
description: Text - Optional
created_at: Timestamp
updated_at: Timestamp
deleted_at: Timestamp (Soft Delete)

Relationships:
- hasMany: StoreType
```

### Store Type Model
```
id: Integer (Primary Key, Auto Increment)
name: String(191) - Required
description: Text - Optional
store_type_description: Text - Optional
store_ui: Text - Optional (UI configuration)
zone_id: Integer - Required, Foreign Key to Zone
title: String(191) - Optional
sub_title: String(191) - Optional
image: String(500) - Optional (Image URL)
offer: String(191) - Optional
radius: Decimal(10,2) - Optional, Min: 0
created_at: Timestamp
updated_at: Timestamp
deleted_at: Timestamp (Soft Delete)

Relationships:
- belongsTo: Zone
```

## Validation Rules

### Zone
- name: Required, 2-191 characters, unique
- description: Optional, can be empty string or null

### Store Type
- name: Required, 2-191 characters
- description: Optional
- store_type_description: Optional
- store_ui: Optional
- zone_id: Required, must be valid zone ID
- title: Optional, 1-191 characters
- sub_title: Optional, 1-191 characters
- image: Optional, valid URL format (auto-populated on upload)
- offer: Optional, 1-191 characters
- radius: Optional, decimal with 2 precision, minimum 0

## Image Upload
- Supported formats: Images (validated by MIME type)
- Max file size: 10MB
- Uploaded to DigitalOcean Spaces
- Automatic URL generation
- Images stored in `/store-types/` folder

## Error Responses

### 400 Bad Request
```json
{
  "code": 400,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "code": 404,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "code": 500,
  "message": "Error message"
}
```

## Authentication & Authorization
- All endpoints require authentication
- Roles: admin, manager
- Admin: Full CRUD access
- Manager: Read access only
- Users without proper roles get 403 Forbidden