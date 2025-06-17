# Tóm tắt các API Endpoints trong HealthMate

## 1. Article Controller (`/api/article`)
- `GET /api/article` - Lấy tất cả articles
- `GET /api/article/{id}` - Lấy article theo ID
- `POST /api/article` - Tạo article mới (Admin only)
- `PUT /api/article/{id}` - Cập nhật article (Admin only)
- `DELETE /api/article/{id}` - Xóa article (Admin only)
- `GET /api/article/categories` - Lấy tất cả categories của article
- `GET /api/article/categories/{tagId}/articles` - Lấy articles theo category
- `GET /api/article/categories/{tagId}` - Lấy category theo ID
- `POST /api/article/categories` - Tạo category mới (Admin only)
- `PUT /api/article/categories/{tagId}` - Cập nhật category (Admin only)
- `DELETE /api/article/categories/{tagId}` - Xóa category (Admin only)
- `POST /api/article/{id}/like` - Like article
- `POST /api/article/{id}/unlike` - Unlike article

## 2. Recipe Controller (`/api/recipe`)
- `GET /api/recipe` - Lấy tất cả recipes
- `GET /api/recipe/{id}` - Lấy recipe theo ID
- `POST /api/recipe` - Tạo recipe mới
- `PUT /api/recipe/{id}` - Cập nhật recipe
- `GET /api/recipe/categories` - Lấy tất cả categories của recipe
- `GET /api/recipe/categories/{categoryId}/recipes` - Lấy recipes theo category
- `GET /api/recipe/categories/{categoryId}` - Lấy category theo ID
- `POST /api/recipe/categories` - Tạo category mới (Admin only)
- `PUT /api/recipe/categories/{categoryId}` - Cập nhật category (Admin only)
- `DELETE /api/recipe/categories/{categoryId}` - Xóa category (Admin only)
- `POST /api/recipe/{id}/like` - Like recipe
- `POST /api/recipe/{id}/unlike` - Unlike recipe

## 3. Health Metric Controller (`/api/healthmetric`) - Authorized
- `GET /api/healthmetric` - Lấy tất cả health metrics của user
- `GET /api/healthmetric/{id}` - Lấy health metric theo ID
- `POST /api/healthmetric` - Tạo health metric mới
- `PUT /api/healthmetric/{id}` - Cập nhật health metric
- `DELETE /api/healthmetric/{id}` - Xóa health metric

## 4. Premium Package Controller (`/api/premiumpackage`)
- `GET /api/premiumpackage` - Lấy tất cả premium packages
- `GET /api/premiumpackage/{packageId}` - Lấy package theo ID
- `GET /api/premiumpackage/active` - Lấy số lượng active subscribers
- `POST /api/premiumpackage` - Tạo package mới
- `PUT /api/premiumpackage/{packageId}` - Cập nhật package
- `DELETE /api/premiumpackage/{packageId}` - Xóa package

## 5. Transaction Controller (`/api/transaction`)
- `GET /api/transaction/all_transactions/{userId}` - Lấy tất cả transactions của user
- `GET /api/transaction/transaction/{transactionId}/{userId}` - Lấy transaction theo ID
- `POST /api/transaction/transaction/create` - Tạo transaction mới
- `GET /api/transaction/transaction/vnpay-return` - VNPay return URL

## 6. Auth Controller (`/api/auth`)
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/login/google` - Đăng nhập Google
- `GET /api/auth/google-response` - Google OAuth response
- `POST /api/auth/register` - Đăng ký

## 7. User Controller (`/api/user`)
- `GET /api/user/all_users` - Lấy tất cả users
- `GET /api/user/all_user_by_email/{email}` - Lấy users theo email
- `GET /api/user/all_users_with_name/{fullName}` - Lấy users theo tên
- `GET /api/user/all_users_by_google/{isGoogle}` - Lấy users theo Google status
- `GET /api/user/all_users_with_role/{roleId}` - Lấy users theo role
- `PUT /api/user/update_user` - Cập nhật user
- `DELETE /api/user/delete_user/{userId}` - Xóa user
- `PUT /api/user/update_user_status/{userId}` - Cập nhật status user (Admin only)
- `POST /api/user/request-reset-password` - Yêu cầu reset password
- `POST /api/user/reset-password` - Reset password

## ✅ Các Endpoint đã được thêm mới:

### Article Categories (CRUD):
- `GET /api/article/categories` - Lấy tất cả categories của article
- `GET /api/article/categories/{tagId}/articles` - Lấy articles theo category
- `GET /api/article/categories/{tagId}` - Lấy category theo ID
- `POST /api/article/categories` - Tạo category mới (Admin only)
- `PUT /api/article/categories/{tagId}` - Cập nhật category (Admin only)
- `DELETE /api/article/categories/{tagId}` - Xóa category (Admin only)

### Recipe Categories (CRUD):
- `GET /api/recipe/categories` - Lấy tất cả categories của recipe  
- `GET /api/recipe/categories/{categoryId}/recipes` - Lấy recipes theo category
- `GET /api/recipe/categories/{categoryId}` - Lấy category theo ID
- `POST /api/recipe/categories` - Tạo category mới (Admin only)
- `PUT /api/recipe/categories/{categoryId}` - Cập nhật category (Admin only)
- `DELETE /api/recipe/categories/{categoryId}` - Xóa category (Admin only)

### Like/Unlike Operations:
- `POST /api/article/{id}/like` - Like article
- `POST /api/article/{id}/unlike` - Unlike article
- `POST /api/recipe/{id}/like` - Like recipe
- `POST /api/recipe/{id}/unlike` - Unlike recipe

## Phân tích thiếu sót còn lại:

### 1. User Profile Management:
- `GET /api/user/profile` - Lấy thông tin profile của user hiện tại
- `PUT /api/user/profile` - Cập nhật profile của user hiện tại

### 2. Search & Filter:
- `GET /api/article/search?q={keyword}` - Tìm kiếm articles
- `GET /api/recipe/search?q={keyword}` - Tìm kiếm recipes
- `GET /api/recipe/filter?difficulty={level}&cookingTime={minutes}` - Lọc recipes

### 3. User Subscription Management:
- `GET /api/user/subscription` - Lấy thông tin subscription của user
- `POST /api/user/subscribe/{packageId}` - Subscribe package
- `DELETE /api/user/unsubscribe` - Unsubscribe

### 4. Analytics/Statistics:
- `GET /api/analytics/articles/popular` - Articles phổ biến nhất
- `GET /api/analytics/recipes/popular` - Recipes phổ biến nhất
- `GET /api/analytics/user/health-summary` - Tóm tắt sức khỏe của user 