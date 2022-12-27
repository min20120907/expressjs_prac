package com.kasberg.photouploader;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private WebView mWebView;
    public static final int INPUT_FILE_REQUEST_CODE = 1;

    private ValueCallback<Uri[]> mFilePathCallback;

    //String link = "http://localhost:3000/upload";
    String link = "http://120.126.84.108:3000/upload";
    //String link = "http://192.168.13.179:3000/upload";
    //String link = "https://kokes.github.io/nbviewer.js/viewer.html";
    //String link = "https://www.w3schools.com/html/html_forms.asp";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = findViewById(R.id.webview);
        //mWebView.setBackgroundColor(Color.TRANSPARENT);
        mWebView.loadUrl(link);
        mWebView.setWebViewClient(new WebViewClient());
        mWebView.setWebChromeClient(new WebChromeClient() {
            /*
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url){
                view.loadUrl(url);
                return true;
            }
             */

            // For Lollipop 5.0+ Devices
            public boolean onShowFileChooser(WebView mWebView,
                                             ValueCallback<Uri[]> filePathCallback,
                                             WebChromeClient.FileChooserParams fileChooserParams)
            {
                if (mFilePathCallback != null) {
                    mFilePathCallback.onReceiveValue(null);
                    mFilePathCallback = null;
                }

                mFilePathCallback = filePathCallback;

                Intent intent = fileChooserParams.createIntent();
                intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                try {
                    startActivityForResult(intent, INPUT_FILE_REQUEST_CODE);
                } catch (ActivityNotFoundException e) {
                    mFilePathCallback = null;
                    Toast.makeText(getApplicationContext(), "Cannot Open File Chooser",
                            Toast.LENGTH_LONG).show();
                    return false;
                }
                return true;
            }
        });
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);

        if (requestCode == INPUT_FILE_REQUEST_CODE) {
            if (mFilePathCallback == null) return;

            Uri[] result = null;
            if (intent.getClipData() != null) {
                // handle multiple-selected files
                final int numSelectedFiles = intent.getClipData().getItemCount();
                result = new Uri[numSelectedFiles];
                for (int i = 0; i < numSelectedFiles; i++) {
                    result[i] = intent.getClipData().getItemAt(i).getUri();
                }
                mFilePathCallback.onReceiveValue(result);
            } else {
                // handle single-selected file
                mFilePathCallback.onReceiveValue(
                        WebChromeClient.FileChooserParams.parseResult(resultCode, intent));
            }
            mFilePathCallback = null;
        } else {
            Toast.makeText(getApplicationContext(), "Failed to Upload Image",
                    Toast.LENGTH_LONG).show();
        }
    }

    public void refresh(View view) {
        mWebView = findViewById(R.id.webview);
        mWebView.loadUrl(link);
    }
}