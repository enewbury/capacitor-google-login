
  Pod::Spec.new do |s|
    s.name = 'EnewburyCapacitorGoogleLogin'
    s.version = '1.0.0-alpha.12'
    s.summary = 'Capacitor plugin to authenticate with google'
    s.license = 'MIT'
    s.homepage = 'https://github.com/enewbury/capacitor-google-login.git'
    s.author = 'Eric Newbury'
    s.source = { :git => 'https://github.com/enewbury/capacitor-google-login.git', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.dependency 'Capacitor'
    s.dependency 'GoogleSignIn'
  end
