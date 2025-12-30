import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Login',
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      }
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


CartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Check if the model is already defined to avoid overwriting it
const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);

export default Cart;