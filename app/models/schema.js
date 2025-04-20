// Mô hình cơ sở dữ liệu Firebase

/*
Collection: users
Document ID: userId (UID được tạo bởi Firebase Auth)
*/
export const userModel = {
  uid: "string", // ID người dùng từ Firebase Auth
  displayName: "string", // Tên hiển thị
  email: "string", // Email
  photoURL: "string", // URL ảnh đại diện
  phoneNumber: "string", // Số điện thoại (tùy chọn)
  address: "string", // Địa chỉ (tùy chọn)
  bio: "string", // Mô tả ngắn về người dùng (tùy chọn)
  fcmTokens: ["string"], // Danh sách token thông báo Firebase Cloud Messaging
  createdAt: "timestamp", // Thời gian tạo tài khoản
  updatedAt: "timestamp", // Thời gian cập nhật thông tin
};

/*
Collection: posts
Document ID: auto-generated
*/
export const postModel = {
  id: "string", // ID của bài đăng
  userId: "string", // ID của người đăng
  title: "string", // Tiêu đề bài đăng
  description: "string", // Mô tả chi tiết
  category: "string", // Danh mục (quần áo, đồ điện tử, thực phẩm, ...)
  condition: "string", // Tình trạng (mới, đã sử dụng, ...)
  images: ["string"], // Mảng các URL ảnh
  location: {
    address: "string", // Địa chỉ
    coordinates: {
      latitude: "number",
      longitude: "number",
    },
  },
  status: "string", // Trạng thái bài đăng: "available" (chưa nhận), "pending" (đang chờ), "completed" (đã nhận)
  recipientId: "string", // ID của người nhận đồ (nếu status là "completed")
  requestCount: "number", // Số lượng yêu cầu nhận
  viewCount: "number", // Số lượt xem
  saveCount: "number", // Số lượt lưu
  createdAt: "timestamp", // Thời gian đăng
  updatedAt: "timestamp", // Thời gian cập nhật
};

/*
Collection: requests
Document ID: auto-generated
*/
export const requestModel = {
  id: "string", // ID của yêu cầu
  postId: "string", // ID của bài đăng
  postTitle: "string", // Tiêu đề bài đăng (để dễ truy vấn)
  postImage: "string", // Ảnh đầu tiên của bài đăng (để dễ hiển thị)
  requesterId: "string", // ID của người gửi yêu cầu
  ownerId: "string", // ID của người sở hữu bài đăng
  message: "string", // Tin nhắn từ người yêu cầu
  status: "string", // Trạng thái: "pending" (đang chờ), "accepted" (chấp nhận), "rejected" (từ chối), "completed" (hoàn thành)
  createdAt: "timestamp", // Thời gian gửi yêu cầu
  updatedAt: "timestamp", // Thời gian cập nhật trạng thái
  responseMessage: "string", // Phản hồi từ chủ bài đăng (nếu có)
};

/*
Collection: savedPosts
Document ID: auto-generated
*/
export const savedPostModel = {
  id: "string", // ID của bản ghi
  userId: "string", // ID của người dùng lưu bài
  postId: "string", // ID của bài đăng được lưu
  postTitle: "string", // Tiêu đề bài đăng (để dễ truy vấn)
  postImage: "string", // Ảnh đầu tiên của bài đăng (để dễ hiển thị)
  ownerId: "string", // ID của người sở hữu bài đăng
  createdAt: "timestamp", // Thời gian lưu
};

/*
Collection: chats
Document ID: Kết hợp 2 ID người dùng (ví dụ: "user1_user2" - người dùng nhỏ hơn trước)
*/
export const chatModel = {
  id: "string", // ID của cuộc trò chuyện
  participants: ["string"], // Mảng chứa ID của 2 người dùng
  lastMessage: "string", // Nội dung tin nhắn cuối cùng
  lastMessageTimestamp: "timestamp", // Thời gian tin nhắn cuối cùng
  unreadCount: {
    "userId1": "number", // Số tin nhắn chưa đọc của người dùng 1
    "userId2": "number", // Số tin nhắn chưa đọc của người dùng 2
  },
};

/*
Sub-collection: messages (nằm trong mỗi document của collection chats)
Document ID: auto-generated
*/
export const messageModel = {
  id: "string", // ID của tin nhắn
  senderId: "string", // ID của người gửi
  text: "string", // Nội dung tin nhắn
  image: "string", // URL ảnh (nếu có)
  read: "boolean", // Đã đọc hay chưa
  createdAt: "timestamp", // Thời gian gửi
};

/*
Collection: notifications
Document ID: auto-generated
*/
export const notificationModel = {
  id: "string", // ID của thông báo
  recipientId: "string", // ID của người nhận thông báo
  senderId: "string", // ID của người gửi thông báo (có thể là null cho thông báo hệ thống)
  type: "string", // Loại thông báo: "request" (yêu cầu mới), "accepted" (chấp nhận), "rejected" (từ chối), "message" (tin nhắn), "system" (hệ thống)
  title: "string", // Tiêu đề thông báo
  body: "string", // Nội dung thông báo
  data: {
    // Dữ liệu bổ sung để điều hướng
    postId: "string", // ID bài đăng (nếu có)
    requestId: "string", // ID yêu cầu (nếu có)
    chatId: "string", // ID cuộc trò chuyện (nếu có)
  },
  read: "boolean", // Đã đọc hay chưa
  createdAt: "timestamp", // Thời gian tạo
};