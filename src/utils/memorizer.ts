import {
  IModel,
  requestInvitationListInvitations,
  requestInvitationSendInvitation,
  requestUserPersonalInfoUpdate,
  requestUserShowUser,
  requestUserUploadAvatar,
} from "@/utils/model";
import { Memorizer } from "@/utils/tools";

export const memorizer = new Memorizer([
  requestUserShowUser,
  requestInvitationListInvitations,
]);
