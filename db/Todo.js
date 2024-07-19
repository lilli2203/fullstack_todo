const mongoose = require("mongoose");
const validator = require("validator");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A Todo must have a title"],
      trim: true,
      minlength: [5, "A Todo title must have more or equal to 5 characters"],
      maxlength: [100, "A Todo title must have less or equal to 100 characters"]
    },
    done: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now,
      validate: {
        validator: function (val) {
          return validator.isDate(val.toString());
        },
        message: 'Date must be a valid date'
      }
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A Todo must have a creator"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "A Todo description must have less or equal to 500 characters"]
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "Priority is either: low, medium, high"
      },
      default: "medium"
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

todoSchema.virtual('formattedDate').get(function () {
  return this.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

todoSchema.statics.findByUser = function (userId) {
  return this.find({ userId });
};
todoSchema.methods.toggleDone = function () {
  this.done = !this.done;
  return this.save();
};
todoSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "name email"
  });
  next();
});

todoSchema.index({ userId: 1, date: -1 });
todoSchema.post('save', function (doc, next) {
  console.log('New todo created:', doc);
  next();
});
todoSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { priority: { $ne: "low" } } });
  next();
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
