import { User } from "@modules/user/user-model";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { randomBytes } from 'crypto';

export class Video {
  @prop({ unique: true, default: randomBytes(20).toString('hex') })
  public videoId: string;

  @prop()
  public title: string;

  @prop()
  public description: string;

  @prop({ enum: ["mp4", "mov"] })
  public extension: string;

  @prop({ required: true, ref: () => User })
  public owner: Ref<User>;

  @prop({ default: false })
  public published: boolean;
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: {
    timestamps: true,
  },
});
