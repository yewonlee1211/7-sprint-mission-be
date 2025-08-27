import { feedbackRepository } from "../repositories/feedback.js";
import { translationRepository } from "../repositories/translation.js";

// 여긴 나중에 싹다 갈아엎기
// 작업물 - 본인이 맞는지 검사
export async function verifyTranslationAuth(req, res, next) {
  const translationId = req.params.id;
  const userId = req.user.id;

  try {
    const translation = await translationRepository.getById(translationId);
    if (!translation) {
      const error = new Error("translation not found");
      error.code = 404;
      throw error;
    }

    if (translation.userId !== userId) {
      const error = new Error("권한이 없습니다.");
      error.code = 403;
      throw error;
    }
  } catch (e) {
    next(e);
  }
}

// 피드백 - 본인이 맞는지 검사
export async function verifyFeedbackAuth(req, res, next) {
  const feedbackId = req.params.id;
  const userId = req.user.id;

  try {
    const feedback = await feedbackRepository.findById(feedbackId);
    if (!feedback) {
      const error = new Error("feedback not found");
      error.code = 404;
      throw error;
    }

    if (feedback.userId !== userId) {
      const error = new Error("권한이 없습니다.");
      error.code = 403;
      throw error;
    }
  } catch (e) {
    next(e);
  }
}
