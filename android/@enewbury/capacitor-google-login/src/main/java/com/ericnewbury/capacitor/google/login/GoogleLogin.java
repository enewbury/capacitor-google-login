package com.ericnewbury.capacitor.google.login;

import android.content.Intent;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

@NativePlugin(requestCodes = { GoogleLogin.RC_GOOGLE_OAUTH })
public class GoogleLogin extends Plugin {

    static final int RC_GOOGLE_OAUTH = 2000;

    @PluginMethod()
    public void authenticate(PluginCall call) {
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestServerAuthCode(call.getString("serverAppId"))
                .requestProfile()
                .requestEmail()
                .build();

        GoogleSignInClient googleClient = GoogleSignIn.getClient(getActivity(), gso);
        Intent signInIntent = googleClient.getSignInIntent();
        startActivityForResult(call, signInIntent, RC_GOOGLE_OAUTH);
    }

    @Override
    protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
        super.handleOnActivityResult(requestCode, resultCode, data);
        if (RC_GOOGLE_OAUTH == requestCode) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        final PluginCall pluginCall = getSavedCall();
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
            JSObject response = new JSObject();
            response.put("code", account.getServerAuthCode());
            pluginCall.success(response);
        } catch (ApiException e) {
            // The ApiException status code indicates the detailed failure reason.
            // Please refer to the GoogleSignInStatusCodes class reference for more information.
            pluginCall.error("signInResult:failed code=" + e.getStatusCode(), e);
        }
    }
}
