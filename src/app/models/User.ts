import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false }, // ✅ Cho phép không có password
        role: { type: String, enum: ["user", "admin"], default: "user" },
        provider: { type: String, default: "credentials" }, // 🔹 Thêm provider
        providerAccountId: { type: String, default: null }, // 🔹 ID tài khoản từ Google
        photoUrl:{ type: String, required: true },// avatar url
    },
    { timestamps: true }
);


export default mongoose.models.User || mongoose.model("User", UserSchema);
