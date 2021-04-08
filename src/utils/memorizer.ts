import {
  IModel,
  requestInvitationListInvitations,
  requestInvitationSendInvitation,
  requestUserPersonalInfoUpdate,
  requestUserShowUser,
  requestUserUploadAvatar,
} from "@/utils/model";
import { Memorizer } from "@/utils/tools";

/**
 * @example
 *  new Memorizer([
 *    requestUserShowUser,
 *    requestInvitationListInvitations,
 *  ])
 *  `requestUserShowUser`'s response will be reused
 */

export const memorizer = new Memorizer([
  requestUserShowUser,
  requestInvitationListInvitations,
]);
