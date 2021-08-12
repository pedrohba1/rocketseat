import mongoose from 'mongoose';

const PackageLimitSchema = new mongoose.Schema({
    courierId: Number,
    packagesTaken: [Number],
    takenDate: Date,
});

export default mongoose.model('PackageLimit', PackageLimitSchema);
