import { Schema, Document, Types } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const addIdVirtual = (schema: Schema) => {
  schema.virtual('id').get(function (this: Document) {
    return (this._id as Types.ObjectId).toHexString();
  });

  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });

  schema.plugin(mongooseLeanVirtuals);
};

export default addIdVirtual;
