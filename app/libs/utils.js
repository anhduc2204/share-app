const { default: storage } = require("./storage");

module.exports = {
  getTimeFromValue(value, dayText, hoursText, minuteText) {
    const totalMinutes = Math.floor(value / 60); // Chuyển ms thành phút
    const totalHours = Math.floor(totalMinutes / 60); // Chuyển phút thành giờ
    const minutes = totalMinutes % 60; // Phần còn lại là phút

    if (totalHours === 0) {
      return `${minutes} ${minuteText}`;
    }
    return `${totalHours} ${hoursText} ${minutes} ${minuteText}`; // Hiển thị đầy đủ cả giờ và phút
  },
  getPercent(a, b) {
    if (b === 0) {
      return 0; // Tránh chia cho 0
    }
    const percentage = Math.floor((a / b) * 100);
    return percentage;
  },
  getTime(distance, speed) {
    if (speed === 0) {
      return "Vận tốc không được bằng 0"; // Tránh chia cho 0
    }
    const time = distance / speed;
    return time; // Thời gian trả về theo đơn vị tương ứng
  },
  addHoursToCurrentTime(hoursToAdd) {
    const now = new Date(); // Lấy thời gian hiện tại

    // Tách phần giờ và phút từ số giờ truyền vào
    const hours = Math.floor(hoursToAdd);
    const minutes = Math.floor((hoursToAdd - hours) * 60);

    // Cộng số giờ và phút vào thời gian hiện tại
    now.setHours(now.getHours() + hours);
    now.setMinutes(now.getMinutes() + minutes);

    // Định dạng lại giờ phút theo dạng HH:mm
    const formattedHours = now.getHours().toString().padStart(2, '0');
    const formattedMinutes = now.getMinutes().toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  },
  fomartTime(inputTime) {
    const now = new Date();
    const past = new Date(inputTime);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} giây trước`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 365) {
      return `${diffInDays} ngày trước`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} ngày trước`;
  },
  getParamFilter({ categorySelected, hashTagSelected, statusSelected, page, page_size }) {
    return {
      filterSort: [
        {
          "sort_by": "book_updated_at",
          "sort_mode": "DESC"
        }
      ],
      filterValue: [],
      filterValueArray: [
        categorySelected.length > 0 && {
          sort_by: 'category',
          sort_mode: categorySelected,
        },
        hashTagSelected.length > 0 && {
          sort_by: 'hashtag',
          sort_mode: hashTagSelected,
        },
      ].filter(Boolean),
      "page": page,
      "page_size": page_size
    }
  }

};
