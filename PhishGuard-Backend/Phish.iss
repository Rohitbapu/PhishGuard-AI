; PhishGuard Pro - AI4Dev '26 @ PSGCT, Coimbatore
; Updated by S B ROHIT BAPU, Muhammed Ibrahim, and K Siddharth

#define MyAppName "PhishGuard Pro"
#define MyAppVersion "1.5"
#define MyAppPublisher "NeuralNest"
#define MyAppURL "https://phishguard-demo-1.preview.emergentagent.com/"
#define MyAppExeName "PhishGuardServer.exe"

[Setup]
AppId={{57A912B5-DA14-49E5-A774-FBBE89C64D8E}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
UninstallDisplayIcon={app}\{#MyAppExeName}

; System Settings
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
ChangesAssociations=yes
DisableProgramGroupPage=yes

; Professional Documentation Paths
LicenseFile=E:\PhishGuard-AI\Project-Documentation\License.txt
InfoBeforeFile=E:\PhishGuard-AI\Project-Documentation\Readme_Before.txt
InfoAfterFile=E:\PhishGuard-AI\Project-Documentation\Instructions.txt

; Output Settings
OutputDir=E:\PhishGuard-AI\PhishGuard-Installer
OutputBaseFilename=PhishGuard_Pro_Setup_v1.5
SetupIconFile=E:\PhishGuard-AI\PhishGuard-Extension\images\icon-128.ico
SolidCompression=yes
WizardStyle=modern dynamic windows11

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
; 1. THE BACKEND (AI ENGINE) - Installs to Program Files
Source: "E:\PhishGuard-AI\PhishGuard-Backend\dist\PhishGuardServer\{#MyAppExeName}"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\PhishGuard-AI\PhishGuard-Backend\dist\PhishGuardServer\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

; 2. THE CHROME EXTENSION - STRATEGIC DEPLOYMENT TO C:\
; This ensures the extension is at a predictable root path for the browser demo
Source: "E:\PhishGuard-AI\PhishGuard-Extension\*"; DestDir: "C:\PhishGuard-Extension"; Flags: ignoreversion recursesubdirs createallsubdirs

; 3. SUPPORTING DOCUMENTS
Source: "E:\PhishGuard-AI\Project-Documentation\*"; DestDir: "{app}\Docs"; Flags: ignoreversion
Source: "E:\PhishGuard-AI\PhishGuard-Web\test.html"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent