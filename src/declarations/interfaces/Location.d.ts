/// <reference path="./GeofenceEvent.d.ts" />
/// <reference path="./MotionActivityEvent.d.ts" />
/// <reference path="./ProviderChangeEvent.d.ts" />
///
declare module "react-native-background-geolocation" {
  /**
  */
  interface Coords {
    floor?: number;
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude?: number;
    altitude_accuracy?: number;
    heading?: number;
    speed?: number;
  }

  /**
  */
  interface Battery {
    is_charging: boolean;
    level: number;
  }

  /**
   * ## Javascript Callback Schema
   * @example
   * ```
   * {
   *    "timestamp":     [Date],     // <-- Javascript Date instance
   *    "event":         [String],    // <-- motionchange|geofence|heartbeat
   *    "is_moving":     [Boolean],  // <-- The motion-state when location was recorded.
   *    "uuid":          [String],   // <-- Universally unique identifier
   *    "coords": {
   *        "latitude":  [Double],
   *        "longitude": [Double],
   *        "accuracy":  [Double],
   *        "speed":     [Double],
   *        "heading":   [Double],
   *        "altitude":  [Double]
   *    },
   *    "activity": {
   *        "type": [still|on_foot|walking|running|in_vehicle|on_bicycle],
   *        "confidence": [0-100%]
   *    },
   *    "battery": {
   *        "level": [Double],
   *        "is_charging": [Boolean]
   *    },
   *    "odometer": [Double/meters]
   * }
   * ```

  ## HTTP POST Schema

  The location-data schema POSTed to your server takes the following form:
   * @example
   * ```
   * {
   *     "location": {
   *         "coords": {
   *             "latitude":   [Double],
   *             "longitude":  [Double],
   *             "accuracy":   [Double],
   *             "speed":      [Double],
   *             "heading":    [Double],
   *             "altitude":   [Double]
   *         },
   *         "extras": {   // <-- optional meta-data
   *             "foo": "bar"
   *         },
   *         "activity": {
   *             "type": [still|on_foot|walking|running|in_vehicle|on_bicycle|unknown],
   *             "confidence": [0-100%]
   *         },
   *         "geofence": {  // <-- Present only if a geofence was triggered at this location
   *             "identifier": [String],
   *             "action": [String ENTER|EXIT]
   *         },
   *         "battery": {
   *             "level": [Double],
   *             "is_charging": [Boolean]
   *         },
   *         "timestamp": [ISO-8601 UTC], // eg:  "2015-05-05T04:31:54.123Z"
   *         "uuid":      [String],       // <-- Universally unique identifier
   *         "event"      [String],       // <-- motionchange|geofence|heartbeat
   *         "is_moving": [Boolean],      // <-- The motion-state when recorded.
   *         "odometer": [Double/meters]
   *     }
   *  }
   * ```
   *
   */
  export interface Location {
    /**
    * `ISO-8601 UTC` timestamp provided by the native location API.
    */
    timestamp: string;
    /**
    * Distance-travelled in meters.
    * ℹ️
    * - [[BackgroundGeolocation.resetOdometer]]
    * - [[BackgroundGeolocation.getOdometer]]
    */
    odometer: number;
    /**
    * `true` if location was recorded while plugin is in the *moving* state.
    */
    isMoving: boolean;
    /**
    * Universally Unique Identifier.  You can use this to match locations recorded at your server with those in the logs.
    * It can also be used to ensure if the plugin has ever posted the same location *twice*.
    */
    uuid: string;
    /**
    * Event responsible for generating this location (`motionchange`, `providerchange`, `geofence`, `heartbeat`).
    */
    event?: string;
    /**
    * __[Android only]__.  Present (and `true`) if the location was generated by a "Fake Location" application.
    */
    mock?: boolean;
    /**
    * `true` if the plugin is currently waiting for the best possible location to arrive.  Samples are recorded when the plugin is transitioning between motion-states (*moving* vs *stationary*) or [[BackgroundGeolocation.getCurrentPosition]].
    * If you're manually posting location to your server, you should not persist these "samples".
    */
    sample?: boolean;
    /**
    * `latitude`, `longitude`, `speed`, `heading`, etc.
    */
    coords: Coords;
    /**
    * Device battery level when the location was recorded.
    */
    battery: Battery;
    /**
    * Optional arbitrary meta-data attached to this location.
    */
    extras?: Object;
    /**
    * If this location was recorded due to a geofence transition, the corresponding geofence-event.
    */
    geofence?: GeofenceEvent;
    /**
    * Device motion-activity when this location was recorded (eg: `still`, `on_foot`, `in_vehicle`).
    */
    activity: MotionActivityEvent;
    /**
    * If this location was recorded due to [[ProviderChangeEvent]], this is a reference to the location-provider state.
    */
    provider?: ProviderChangeEvent;
  }
}
