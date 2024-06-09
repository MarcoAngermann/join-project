function renderSignUpHTML() {
  return /*html*/ `
        <form class="formSignUp" id="formSignUp" onsubmit="AddUser(event)">

            <div class="headlineSignUp">
                <a class="a_headlineSignUp" onclick="backToLogin()"><img class="icoArrowLeft"
                        src="../assets/icons/arrow-left-line.svg"></i></a>
                <h1 class="title underline">Sign up</h1>
            </div>
            <div class="groupSignUp-input">
                <input class="inputs style_InputTypography1" type="text" id="name"
                    style="background-image: url(../assets/icons/personInput_icon.svg)" placeholder="Name" required>
                <input class="inputs style_InputTypography1" type="email" id="email"
                    style="background-image: url(../assets/icons/mail_icon.svg)" placeholder="Email" required>
                <input class="inputs style_InputTypography1" id="password"
                    style="background-image: url(../assets/icons/lock_icon.svg)" placeholder="Password"
                    onkeyup="keyDown()" onclick="showPassword()" required>
                <input class="inputs style_InputTypography1" name="confirmPass"
                    style="background-image: url(../assets/icons/lock_icon.svg)" id="passwordConfirm"
                    placeholder="Confirm Password" onkeyup="keyDownConf()" onclick="showPasswordConf()" required>
                <span id="pwErrorCheck" style="color: red; display: none;"> * Password and confirmPass are not the
                    same</span>
            </div>
            <div class="box-rememberSignup style_InputTypography2">
                <input class="checkBox" type="checkbox" id="acepptRules" onchange="isChecked()">
                <span for="remember"> I accept the &nbsp; <a class="a_formSignUp" href="./privacy_policy.html"> Privacy policy</a></span>
            </div>

            <div class="divBtn">
                <button class="btnJoin style_BtnTypography1" type="submit" id="btnSignUp">Sign up</button>
            </div>
        </form>


        <div id="dialogSingUp" class="dialog-bg d-none">
            <img class="dialog" src="..//assets/icons/You_Signed_Up_successfully_animation_icon.svg">
        </div>

    </div>
    `;
}
