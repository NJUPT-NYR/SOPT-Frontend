import {
  IModel,
  requestInvitationListInvitations,
  requestInvitationSendInvitation,
  requestUserPersonalInfoUpdate,
  requestUserShowUser,
  requestUserUploadAvatar,
} from "@/utils/model";
import { Revalidator } from "@/utils/tools";

export const revalidator = new Revalidator<IModel>([
  [
    requestUserShowUser,
    [requestUserUploadAvatar, requestUserPersonalInfoUpdate],
  ],
  [requestInvitationListInvitations, [requestInvitationSendInvitation]],
]);
