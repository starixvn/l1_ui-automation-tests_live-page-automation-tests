export function parseArgs() {
  //console.log('Debugging process.argv in parseArgs:', process.argv); // Log toàn bộ process.argv để kiểm tra
  const args = process.argv.slice(2).filter(arg => arg !== '--'); // Ignore standalone '--'
  ///console.log('Raw arguments:', args); // Log các tham số thô

  const result: Record<string, string> = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].replace(/^--/, '');
      console.log('Processing key:', key); // Log từng key

      if (key.includes('=')) { // Sửa lỗi cú pháp
        const [k, v] = key.split('=');
        result[k] = v;
        console.log(`Parsed key-value: ${k}=${v}`); // Log key-value dạng --key=value
      } else {
        const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
        result[key] = value;
        console.log(`Parsed key-value: ${key}=${value}`); // Log key-value dạng --key value hoặc flag
        if (value !== 'true') i++; // Skip the next argument since it's the value
      }
    }
  }

  console.log('Parsed arguments result:', result); // Log kết quả cuối cùng
  return result;
};
export default parseArgs;