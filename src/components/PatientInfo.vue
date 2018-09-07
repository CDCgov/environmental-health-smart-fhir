<template>
  <div class="container">
    <h1 class="title is-5">Prepare and send information to patient</h1>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="Information title (optional)">
      </div>
    </div>
    <div class="field">
      <label class="label">Message</label>
      <div class="control">
        <textarea class="textarea" placeholder="Message"></textarea>
      </div>
    </div>
    <hr>  
    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          Send Air Quality and Asthma <strong>fact sheets</strong>
        </label>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          Send <strong>alerts</strong> on elevated Air Quality Indicator values
        </label>
      </div>
    </div>
    <hr>
    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          Send to email
        </label>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          Send to mobile phone
        </label>
      </div>
    </div>

    <hr>    
    <div class="field">
      <div class="control is-danger">
        <label class="checkbox">
          <input type="checkbox" class="is-danger">
          I have the patient's consent to send this information.
        </label>
      </div>
    </div>


  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link">Send</button>
    </div>
    <div class="control">
      <button class="button">Print handout</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'patient-info'
};
</script>

<style>
div.is-danger {
  color: #ff3860;
}
</style>
