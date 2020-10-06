import * as H from 'history';

declare global {
  /*
   * Temporary type aliases to allow for easier incremental transition to TS
   */
  type $TSFixMe = any;

  /**
   * Strings that should probably be an enum or a "flavored"/"branded" nominal type.
   */
  type $TSFixMeString = string;
}
