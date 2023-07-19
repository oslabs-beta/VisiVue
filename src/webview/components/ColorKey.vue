<template>

  <div id="key-container">
    <h6 id="title">Color Key</h6>
    <p id="one-way">One-way</p>
    <p id="two-way">Two-way</p>
    <p id="both">Both</p>
  </div>
  
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');

  #key-container {
    background-color: #494949;
    width: 8.7rem;
    height: 8.4rem;
    border: 1px;
    border: 5px solid rgb(171, 171, 171);;
    display: flex;
    flex-direction: column;
    margin-top: .8rem;
    margin-right: 1rem;
    color: rgb(230, 230, 230);
    font-family: 'Inter', sans-serif;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  }
  #title {
    font-size: 1rem;
    margin-top: .4rem;
    margin-bottom: 0;
    text-decoration: underline;
    text-shadow: 0 4px 12px rgba(0, 0, 0, .3);
  }
  #one-way {
    color: rgb(66, 136, 242);
    font-weight: strong;
    font-size: .9rem;
    text-shadow: 0 4px 12px rgba(0, 0, 0, .3);
  }
  #two-way {
    color: rgb(65, 184, 131);
    font-weight: strong;
    font-size: .9rem;
    margin-top: 0;
    padding: 0;
    text-shadow: 0 4px 12px rgba(0, 0, 0, .3);
  }
  #both {
    color: rgb(244, 102, 102);
    font-weight: strong;
    font-size: .9rem;
    padding: 0;
    margin: 0;
    text-shadow: 0 4px 12px rgba(0, 0, 0, .3);
    margin-bottom: .4rem;
  }

</style>