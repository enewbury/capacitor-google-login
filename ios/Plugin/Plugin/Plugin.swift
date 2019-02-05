import Foundation
import Capacitor
import GoogleSignIn

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 */
@objc(GoogleLogin)
public class GoogleLogin: CAPPlugin, GIDSignInDelegate, GIDSignInUIDelegate {

    var savedLastCall: CAPPluginCall?

    public override func load() {
        print("loging")
        NotificationCenter.default.addObserver(self, selector: #selector(self.urlOpened(notification:)), name: Notification.Name(CAPNotifications.URLOpen.name()), object: nil)

        GIDSignIn.sharedInstance().delegate = self
        GIDSignIn.sharedInstance().uiDelegate = self
    }

    @objc func authenticate(_ call: CAPPluginCall) {
        self.savedLastCall = call

        let iosConfig = call.getObject("ios") ?? [:]
        let iosAppId = iosConfig["appId"] as? String
        GIDSignIn.sharedInstance().clientID = iosAppId
        GIDSignIn.sharedInstance().serverClientID = call.getString("serverAppId")
        GIDSignIn.sharedInstance().scopes = ["email", "profile"]
        print("trying to signin")
        GIDSignIn.sharedInstance().signOut()
        GIDSignIn.sharedInstance().signIn()
        print("called signin")
    }

    @objc func urlOpened(notification: NSNotification) {
        guard let object = notification.object as? [String:Any?] else { return }
        let url = object["url"] as? URL
        guard let options = object["options"] as? [UIApplicationOpenURLOptionsKey : Any] else { return }
        GIDSignIn.sharedInstance().handle(url,
                                          sourceApplication: options[UIApplicationOpenURLOptionsKey.sourceApplication] as? String,
                                          annotation: options[UIApplicationOpenURLOptionsKey.annotation])
    }

    public func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error!) {
        if let error = error {
            print("\(error.localizedDescription)")
        } else {
            let data = [ "code": user.serverAuthCode as Any ]
            self.savedLastCall?.success(data)
        }
    }

    public func sign(_ signIn: GIDSignIn!, present viewController: UIViewController!) {
        self.bridge.viewController.present(viewController, animated: true, completion: nil)
    }

    public func sign(_ signIn: GIDSignIn!, dismiss viewController: UIViewController!) {
        self.bridge.viewController.dismiss(animated: true, completion: nil)
    }
}
