function renderLoginHTML() {
  return /*html*/ `
  <form id="formLogin" class="formLogin" onsubmit="return doLogin(event)">
    <h1 class="title underline">Log in</h1>
    <div class="groupLogin-input">
      <input
        class="inputs style_InputTypography1"
        type="email"
        id="email"
        style="background-image: url(./assets/icons/mail_icon.svg)"
        placeholder="Email"
        required
      />
      <input
        class="inputs style_InputTypography1"
        id="password"
        onclick="showPassword()"
        style="background-image: url(./assets/icons/lock_icon.svg)"
        placeholder="Password"
        required
      />
    </div>
    <div class="box-remember style_InputTypography2">
      <input class="checkBox" type="checkbox" id="remember" />
      <label for="remember"> Remember me</label>
    </div>
    <div class="divBtn">
      <button class="btnJoin style_BtnTypography1" type="submit">
        Log in
      </button>
      <button
        class="btnGuest style_BtnTypography1"
        id="Guest_Login"
        onclick="getGuestLogin(event)"
      >
        Guest Log in
      </button>
    </div>
  </form>
        <div id="mobileDivSignUp" class="mobile_divSignUp">
          <p class="styleTypography1">Not a Join user?</p>
          <a
            class="btnJoin style_BtnTypography2"
            type="button"
            onclick="renderSignUp()"
            >Sign up</a
          >
        </div>
  `;
}
