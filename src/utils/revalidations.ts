import {
  IModel,
  requestInvitationListInvitations,
  requestInvitationSendInvitation,
  requestUserAuthResetPasskey,
  requestUserPersonalInfoUpdate,
  requestUserShowUser,
  requestUserUploadAvatar,
} from "@/utils/model";
import { Revalidator } from "@/utils/tools";

/**
 * @example
 *  new Revalidator<IModel>([
 *    [
 *       requestUserShowUser,
 *       [requestUserUploadAvatar, requestUserPersonalInfoUpdate],
 *    ]
 *  ])
 *  `requestUserShowUser` will be automatically updated when `requestUserUploadAvatar` or `requestUserPersonalInfoUpdate` called
 */

export const revalidator = new Revalidator<IModel>([
  [
    requestUserShowUser,
    [
      requestUserUploadAvatar,
      requestUserPersonalInfoUpdate,
      requestUserAuthResetPasskey,
    ],
  ],
  [requestInvitationListInvitations, [requestInvitationSendInvitation]],
]);
