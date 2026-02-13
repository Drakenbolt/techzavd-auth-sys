import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true }) 
export class User {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, unique: true }) 
  email!: string;

  @Prop({ required: true })
  password!: string; 

  @Prop({ default: null }) 
  avatarUrl?: string;

  @Prop({ default: null })
  resetPasswordToken?: string;

  @Prop({ default: null })
  resetPasswordExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);