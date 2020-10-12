declare global {
  /*
   * Temporary type aliases that should be narrowed if/when possible
   */
  type $TSFixMe = any;

  /**
   * Strings that should probably be an enum or a "flavored"/"branded" nominal type.
   */
  type $TSFixMeString = string;
}
