import axios from "axios";

export async function convertImageUrlToBase64(
  imageUrl: string
): Promise<string | null> {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // Buffer를 Base64로 변환
    const base64 = Buffer.from(response.data, "binary").toString("base64");

    // 이미지 MIME 타입 결정
    const contentType = response.headers["content-type"];

    // 완전한 Base64 문자열 생성 (data URL 형식)
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null;
  }
}
