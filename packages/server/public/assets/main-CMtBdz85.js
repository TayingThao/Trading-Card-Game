import{i as h,O as f,x as i,e as S,a as p,n as b,r as u,d as $,h as P,b as C,_ as B}from"./state-BrSeRalY.js";var T=Object.defineProperty,y=(o,e,t,s)=>{for(var r=void 0,a=o.length-1,n;a>=0;a--)(n=o[a])&&(r=n(e,t,r)||r);return r&&T(e,t,r),r};const x=class x extends h{constructor(){super(...arguments),this.page="Home",this._authObserver=new f(this,"trading:auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:t}=e;t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)}),this.initializeTheme()}initializeTheme(){const e=localStorage.getItem("theme");e&&(document.body.classList.remove("dark-mode","light-mode"),document.body.classList.add(e))}handleThemeToggle(e){const s=e.target.checked?"light-mode":"dark-mode";document.body.classList.remove("dark-mode","light-mode"),document.body.classList.add(s),localStorage.setItem("theme",s)}render(){return i`
      <header>
        <img class="logo" src="images/TCGicon.jpg" alt="Game Logo" width="100">
        <div>
          <h1>Trading Card Game</h1>
          <nav>
            <a href="/app">Home</a> |
            <a href="/app/profile">Profile</a> |
            <a href="/app/inventory">Inventory</a> |
            <a href="/app/store">Store</a> |
          </nav>
        </div>
        <h2>${this.page}</h2>
        <a slot="actuator">
          Hello, ${this.userid||"traveler"}
        </a>
        ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
        <label>
          <input 
            type="checkbox" 
            id="toggleDarkMode"
            .checked=${localStorage.getItem("theme")==="light-mode"}
            @change=${this.handleThemeToggle}
          />
          Light mode
        </label>
      </header>
    `}renderSignOutButton(){return i`
      <button
        @click=${e=>{S.relay(e,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return i`
      <a href="/login.html" @click=${e=>{e.preventDefault(),window.location.href="/login.html"}}>
        Sign In…
      </a>
    `}};x.styles=p`
    header {
      display: flex;
      align-items: center;
      justify-content: left;
      padding: var(--header-padding);
      background-color: var(--color-background-header);
      color: var(--color-text-header);
      text-align: var(--header-text-align);
      font-family: var(--font-family-header);
    }

    .logo {
      border-radius: var(--logo-border-radius);
      margin-right: var(--header-spacing);
      width: var(--logo-size);
    }

    h1 {
      font-size: var(--font-size-title);
      margin: 0;
    }

    h2 {
      margin-left: var(--header-spacing);
      margin-top: 0;
      margin-bottom: 0;
      margin-right: 20px;
    }

    nav {
      padding: var(--navigation-padding);
      font-size: var(--font-size-header-nav);
      margin-top: var(--size-spacing-small, 0.5rem);
    }

    nav a {
      color: var(--header-text-color);
      text-decoration: none;
      font-size: var(--font-size-header-nav);
    }

    nav a:hover {
      text-decoration: underline;
    }

    label {
      font-size: var(--font-size-header-nav);
      margin-left: var(--header-spacing);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    img {
      border-radius: var(--logo-border-radius);
      margin-right: var(--header-spacing);
      width: var(--logo-size);
    }
  `;let d=x;y([b({type:String})],d.prototype,"page");y([u()],d.prototype,"loggedIn");y([u()],d.prototype,"userid");const k=class k extends h{render(){return i`
      <main>
        <p>Updates</p>
        <dl class="updates">
          <dt class="update-item">Oct 18</dt>
          <dd class="update-description">We deployed! Everything is almost as good as it could be.</dd>
          <dt class="update-item">Update 0</dt>
          <dd class="update-description">Added a card page</dd>
        </dl>
      </main>
    `}};k.styles=p`
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: var(--font-family-main);
    }

    main p {
      color: var(--color-text-main);
      font-size: var(--font-size-main-text);
      margin: 20px;
    }

    .updates {
      max-width: 400px;
      color: var(--color-text-list);
      background-color: var(--color-background-list);
      padding: 30px;
    }

    .update-item::before {
      content: "- ";
    }

    .update-item {
      font-size: var(--font-size-list-term);
    }

    .update-description {
      font-size: var(--font-size-list-definition);
      margin-bottom: 15px;
      margin-left: 40px;
    }
  `;let v=k;var q=Object.defineProperty,_=(o,e,t,s)=>{for(var r=void 0,a=o.length-1,n;a>=0;a--)(n=o[a])&&(r=n(e,t,r)||r);return r&&q(e,t,r),r};const w=class w extends h{constructor(){super(...arguments),this.qty=0}render(){return i`
      <div class="card">
        <img src="${this.imgSrc}" alt="Card image" />
        <div class="qty">×${this.qty}</div>
        <div class="name"><slot></slot></div>
      </div>
    `}};w.styles=p`
  .card {
      width: 200px;
      text-align: center;
      font-family: sans-serif;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 4px;
    }

    img {
      width: 100%;
      display: block;
      border-radius: 4px;
    }

    .qty {
      font-weight: bold;
      margin-top: 2px;
    }
  `;let c=w;_([b({attribute:"img-src"})],c.prototype,"imgSrc");_([b({type:Number})],c.prototype,"qty");var I=Object.defineProperty,M=(o,e,t,s)=>{for(var r=void 0,a=o.length-1,n;a>=0;a--)(n=o[a])&&(r=n(e,t,r)||r);return r&&I(e,t,r),r};const m=class m extends h{constructor(){super(...arguments),this.items=[],this._authObserver=new f(this,"trading:auth")}get src(){return"/api/inventory/"}get authorization(){return this._authModel?.user?.authenticated&&{Authorization:`Bearer ${this._authModel.user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._authModel=e,this.hydrate(this.src)})}hydrate(e){fetch(e,{headers:this.authorization||{}}).then(t=>t.json()).then(t=>{t&&(this.items=t.map(s=>({_id:s._id,name:s.name,qty:s.qty,imgSrc:s.imgSrc})))})}renderItem(e){return i`
      <inventory-card img-src=${e.imgSrc} qty=${e.qty}>
        ${e.name}
      </inventory-card>
    `}render(){return i`
        <div class="inventory-grid">
            ${this.items.map(this.renderItem)}
        </div> 
    `}};m.uses=$({"inventory-card":c}),m.styles=p`
    .inventory-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 10px;
    }
  `;let g=m;M([u()],g.prototype,"items");var A=Object.defineProperty,O=(o,e,t,s)=>{for(var r=void 0,a=o.length-1,n;a>=0;a--)(n=o[a])&&(r=n(e,t,r)||r);return r&&A(e,t,r),r};const z=class z extends h{constructor(){super(...arguments),this._authObserver=new f(this,"trading:auth")}get src(){return"/api/store"}get authorization(){return this._authModel?.user?.authenticated&&{Authorization:`Bearer ${this._authModel.user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._authModel=e})}handleBuyPack(e){e.preventDefault(),this.message=void 0,this.error=void 0,fetch(this.src,{method:"POST",headers:{"Content-Type":"application/json",...this.authorization||{}},body:JSON.stringify({packType:"pack1"})}).then(t=>{if(!t.ok)throw new Error(`Failed to purchase pack: ${t.status}`);return t.json()}).then(t=>{this.message=`Successfully purchased pack! Added ${t.cardsAdded||5} cards to your inventory.`}).catch(t=>{this.error=t.message||"Failed to purchase pack"})}render(){return i`
      <div class="store-container">
        <h1>Buy a pack!</h1>
        <p>Packs cost 20 coins</p>
        
        ${this.message?i`<p class="success">${this.message}</p>`:""}
        ${this.error?i`<p class="error">${this.error}</p>`:""}
        
        <form class="buy-form" @submit=${this.handleBuyPack}>
          <dl>
            <dt>Pack 1</dt>
            <dd>Contains 5 random cards</dd>
          </dl>
          <button type="submit">Buy Pack</button>
        </form>
      </div>
    `}};z.styles=p`
    .store-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      margin-top: var(--size-spacing-medium, 1rem);
      margin-bottom: var(--size-spacing-small, 0.5rem);
    }

    p {
      color: var(--color-text-main);
      font-size: var(--font-size-main-text);
      margin: 20px;
    }

    .buy-form {
      background-color: var(--color-background-list);
      padding: 30px;
      display: flex;
      flex-direction: column;
    }

    .buy-form dl {
      margin-bottom: 20px;
    }

    .buy-form dt {
      font-weight: bold;
      margin-bottom: 10px;
    }

    .buy-form dd {
      margin-left: 0;
    }

    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: 2px solid #0056b3;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }

    button:hover {
      background-color: #0056b3;
      border-color: #004085;
    }

    .success {
      color: green;
      font-weight: bold;
    }

    .error {
      color: red;
      font-weight: bold;
    }
  `;let l=z;O([u()],l.prototype,"message");O([u()],l.prototype,"error");const L=[{path:"/app/inventory",view:()=>i`
      <inventory-view></inventory-view>
    `},{path:"/app/store",view:()=>i`
      <store-view></store-view>
    `},{path:"/app/profile",view:()=>i`
      <profile-view></profile-view>
    `},{path:"/app",view:()=>i`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];$({"mu-auth":C.Provider,"mu-history":P.Provider,"mu-switch":class extends B.Element{constructor(){super(L,"trading:history","trading:auth")}},"tcg-header":d,"home-view":v,"inventory-view":g,"store-view":l});
