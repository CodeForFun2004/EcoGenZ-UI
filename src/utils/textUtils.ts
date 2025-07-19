/**
 * Cắt ngắn văn bản nếu quá dài
 * @param text - Văn bản cần cắt ngắn
 * @param maxLength - Độ dài tối đa
 * @param suffix - Ký tự thêm vào cuối (mặc định là '...')
 * @returns Văn bản đã được cắt ngắn
 */
export const truncateText = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length).trim() + suffix;
};

/**
 * Cắt ngắn tên người dùng
 * @param name - Tên người dùng
 * @param maxLength - Độ dài tối đa (mặc định là 15)
 * @returns Tên đã được cắt ngắn
 */
export const truncateUsername = (name: string, maxLength: number = 15): string => {
  return truncateText(name, maxLength);
};
