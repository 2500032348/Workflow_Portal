import ReviewHistory from "../models/reviewhistory.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRETE_KEY = process.env.SECRETE_KEY;

export async function createReview(data, token) {
    let response;

    try {
        const payload = jwt.verify(token, SECRETE_KEY);

        data.reviewedBy = payload.crid;

        await ReviewHistory.create(data);

        response = {
            code: 200,
            message: "Review has been saved"
        };
    }
    catch (e) {
        response = {
            code: 500,
            message: e.message
        };
    }

    return response;
}

export async function getReviews(page, size, token) {
    let response;

    try {
        jwt.verify(token, SECRETE_KEY);

        const skip = (page - 1) * size;

        const reviews = await ReviewHistory.find()
            .skip(skip)
            .limit(size)
            .sort({ _id: 1 });

        const totalrecords = await ReviewHistory.countDocuments();

        response = {
            code: 200,
            page: page,
            size: size,
            totalpages: Math.ceil(totalrecords / size),
            reviews: reviews
        };
    }
    catch (e) {
        response = {
            code: 500,
            message: e.message
        };
    }

    return response;
}

export async function deleteReview(id, token) {
    let response;

    try {
        jwt.verify(token, SECRETE_KEY);

        await ReviewHistory.findOneAndDelete({ _id: id });

        response = {
            code: 200,
            message: "Review has been deleted"
        };
    }
    catch (e) {
        response = {
            code: 500,
            message: e.message
        };
    }

    return response;
}