// Mô hình cơ sở dữ liệu Firebase

/*
Collection: users
Document ID: userId (UID được tạo bởi Firebase Auth)
*/
export interface UserModel {
  uid: string; // ID người dùng từ Firebase Auth
  displayName: string; // Tên hiển thị
  email: string; // Email
  photoURL: string; // URL ảnh đại diện
  phoneNumber: string; // Số điện thoại (tùy chọn)
  // address?: string; // Địa chỉ (tùy chọn)
  // bio?: string; // Mô tả ngắn về người dùng (tùy chọn)
  fcmTokens: string[]; // Danh sách token thông báo Firebase Cloud Messaging
  createdAt: string; // Thời gian tạo tài khoản
  updatedAt: string; // Thời gian cập nhật thông tin
}

/*
Collection: posts
Document ID: auto-generated
*/
export interface PostModel {
  id?: string; // ID của bài đăng
  userId: string; // ID của người đăng
  userName: string;
  title: string; // Tiêu đề bài đăng
  description: string; // Mô tả chi tiết
  productName: string; // tên sản phẩm đăng
  category: string; // Danh mục (quần áo, đồ điện tử, thực phẩm, ...)
  phoneNumber: string,
  // condition: string; // Tình trạng (mới, đã sử dụng, ...)
  images: string[]; // Mảng các URL ảnh
  location: {
    address: string; // Địa chỉ
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  status?: 'available' | 'pending' | 'completed'; // Trạng thái bài đăng
  recipientId?: string; // ID của người nhận đồ (nếu status là "completed")
  requesterList?: string[]; // ID của các người yêu cầu nhận
  requestCount?: number; // Số lượng yêu cầu nhận
  viewCount?: number; // Số lượt xem
  saveCount?: number; // Số lượt lưu
  createdAt?: string; // Thời gian đăng
  updatedAt?: string; // Thời gian cập nhật
}

/*
Collection: requests
Document ID: auto-generated
*/
export interface RequestModel {
  id?: string; // ID của yêu cầu
  postId: string; // ID của bài đăng
  postTitle: string; // Tiêu đề bài đăng (để dễ truy vấn)
  postDesc: string;
  postImage: string; // Ảnh đầu tiên của bài đăng (để dễ hiển thị)
  requesterId: string; // ID của người gửi yêu cầu
  requesterName: string; 
  ownerId: string; // ID của người sở hữu bài đăng
  ownerName: string;
  message?: string; // Tin nhắn từ người yêu cầu
  responseStatus?: 'accepted' | 'rejected', // Trạng thái phản hồi của chủ bài đăng
  status?: 'pending' | 'completed', // Trạng thái của yêu cầu
  createdAt?: string; // Thời gian gửi yêu cầu
  updatedAt?: string; // Thời gian cập nhật trạng thái
  responseMessage?: string; // Phản hồi từ chủ bài đăng (nếu có)
}

/*
Collection: savedPosts
Document ID: auto-generated
*/
export interface SavedPostModel {
  // id: string; // ID của bản ghi
  userId: string; // ID của người dùng lưu bài
  postId: string; // ID của bài đăng được lưu
  postTitle: string; // Tiêu đề bài đăng (để dễ truy vấn)
  postImage: string; // Ảnh đầu tiên của bài đăng (để dễ hiển thị)
  ownerId: string; // ID của người sở hữu bài đăng
  createdAt: string; // Thời gian lưu
}

/*
Collection: chats
Document ID: Kết hợp 2 ID người dùng (ví dụ: "user1_user2" - người dùng nhỏ hơn trước)
*/
export interface ChatModel {
  // id: string; // ID của cuộc trò chuyện
  participants: string[]; // Mảng chứa ID của 2 người dùng
  lastMessage: string; // Nội dung tin nhắn cuối cùng
  lastMessageTimestamp: string; // Thời gian tin nhắn cuối cùng
  unreadCount: {
    [userId: string]: number; // Số tin nhắn chưa đọc theo từng người dùng
  };
}

/*
Sub-collection: messages (nằm trong mỗi document của collection chats)
Document ID: auto-generated
*/
export interface MessageModel {
  // id: string; // ID của tin nhắn
  senderId: string; // ID của người gửi
  text: string; // Nội dung tin nhắn
  image?: string; // URL ảnh (nếu có)
  read: boolean; // Đã đọc hay chưa
  createdAt: string; // Thời gian gửi
}

/*
Collection: notifications
Document ID: auto-generated
*/
export interface NotificationModel {
  // id: string; // ID của thông báo
  recipientId: string; // ID của người nhận thông báo
  senderId?: string; // ID của người gửi thông báo (có thể là null cho thông báo hệ thống)
  type: 'request' | 'accepted' | 'rejected' | 'message' | 'system'; // Loại thông báo
  title: string; // Tiêu đề thông báo
  body: string; // Nội dung thông báo
  data: {
    postId?: string; // ID bài đăng (nếu có)
    requestId?: string; // ID yêu cầu (nếu có)
    chatId?: string; // ID cuộc trò chuyện (nếu có)
  };
  read: boolean; // Đã đọc hay chưa
  createdAt: string; // Thời gian tạo
}