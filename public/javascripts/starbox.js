//  Starbox 1.1.1 - 05-08-2008
//  Copyright (c) 2008 Nick Stakenburg (http://www.nickstakenburg.com)
//
//  Licensed under a Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 Unported License
//  http://creativecommons.org/licenses/by-nc-nd/3.0/

//  More information on this project:
//  http://www.nickstakenburg.com/projects/starbox/

var Starboxes = {
  options: {
    buttons: 5,                                  // amount of clickable areas
    className : 'default',                       // default class
    color: false,                                // would overwrite the css style to set color on the stars
    duration: 0.6,                               // the duration of the revert effect, when effects are used
    effect: {
      mouseover: false,                          // use effects on mouseover, default false
      mouseout: (window.Effect && Effect.Morph)  // use effects on mouseout, default when available
    },
    hoverColor: false,                           // overwrites the css hover color
    hoverClass: 'hover',                         // the css hover class color
    ghostColor: false,                           // the color of the ghost stars, if used
    ghosting: false,                             // ghosts the previous vote
    identity: false,                             // a unique value you can give each starbox
    indicator: false,                            // use an indicator, default false
    inverse: false,                              // inverse the stars, right to left
    locked: false,                               // lock the starbox to prevent voting
    max: 5,                                      // the maximum rating of the starbox
    onRate: Prototype.emptyFunction,             // default onRate, function(element, memo) {}
    rated: false,                                // or a rating to indicate a vote has been cast
    ratedClass: 'rated',                         // class when rated
    rerate: false,                               // allow rerating
    overlay: 'default.png',                      // default star overlay image
    overlayImages: '/images/starbox/',         // directory of images relative to this file
    stars: 5,                                    // the amount of stars
    total: 0                                     // amount of votes cast
  }
};

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('V.1f(h,{3m:"1.6.0.2",3l:"1.8.1",1Y:a(){3.1o("18");3.Y.2g=1;9(/^(3k?:\\/\\/|\\/)/.3i(3.5.1y)){3.1w=3.5.1y}1u{b A=/17(?:-[\\w\\d.]+)?\\.2p(.*)/;3.1w=(($$("3K 3F[v]").2j(a(B){i B.v.3p(A)})||{}).v||"").2b(A,"")+3.5.1y}},1o:a(A){9((3j 1b[A]=="3h")||(3.1q(1b[A].3e)<3.1q(3["20"+A]))){3c("36 31 "+A+" >= "+3["20"+A]);}},1q:a(A){b B=A.2b(/1v.*|\\./g,"");B=1s(B+"0".1r(4-B.2O));i A.2K("1v")>-1?B-1:B},1R:(a(B){b A=e 2B("2x ([\\\\d.]+)").2u(B);i A?(2r(A[1])<7):1P})(3I.3H),Y:a(B){B=$(B);b C=B.3E("2l"),A=1K.3C;9(C){i C}3B{C="3z"+A.2g++}3r($(C));B.3q("2l",C);i C},1F:[],3n:a(A){9(!3.1p(A.v)){3.1F.1h(A)}i A},1p:a(A){i 3.1F.2j(a(B){i B.v==A})},N:[],2a:a(A){3.N.1h(A)},1a:a(){9(!3.N[0]){3.27=25;i}3.24(3.N[0])},24:a(C){b E=[],B=C.5.23,A=3.1p(B);3.N.G(a(F){9(F.5.23==B){E.1h(F);3.N=3.N.3d(F)}}.t(3));9(!A){b D=e 3b();D.39=a(){3.1A(E,{v:B,z:D.z,I:D.I,1X:D.v})}.t(3);D.v=h.1w+B}1u{3.1A(E,A)}},1A:a(B,A){B.G(a(C){C.1e=A;C.1V()});3.1a()},1t:(a(A){i{1c:"1c",S:"S",H:(A?"2U":"H")}})(18.19.1m),2e:a(A){9(!18.19.1m){A=A.2N(a(E,D){b C=V.2L(3)?3:3.l,B=D.2I;9(B!=C&&!$A(C.2H("*")).2F(B)){E(D)}})}i A}});h.1Y();2D.1Q("2A:2y",h.1a.t(h));b 2w=2v.2t({2s:a(A,B){3.l=$(A);3.j=B;3.5=V.1f(V.2q(h.5),1K[2]||{});$w("J f u q").G(a(C){3[C]=3.5[C]}.t(3));3.W=3.5.W||(3.f&&!3.5.1O);9(!3.J){3.J=h.Y(3.l)}9(3.5.o&&(3.5.o.S||3.5.o.H)){h.1o("3G")}h.2a(3);9(h.27){h.1a()}},2o:a(){$w("H S 1c").G(a(C){b B=C.2n(),A=3["1j"+B].3D(3);3["1j"+B+"1L"]=(C=="H"&&!18.19.1m)?h.2e(A):A;3.16.1Q(h.1t[C],3["1j"+B+"1L"])}.t(3));3.M.2k("c",{2i:"3A"})},2h:a(){$w("S H 1c").G(a(A){3.16.3v(h.1t[A],3["1j"+A.2n()+"1L"])}.t(3));3.M.2k("c",{2i:"3u"})},1V:a(){3.13=3.1e.I;3.12=3.1e.z;3.1G=3.1e.1X;3.X=3.13*3.5.1n;3.14=3.X/3.5.M;3.1i=3.5.u/3.5.M;9(3.5.o){3.2d=3.11(0);3.2c=3.11(3.5.u)}b A={L:{O:"L",1l:0,s:0,I:3.X+"k",z:3.12+"k"},1E:{O:"29",I:3.X+"k",z:3.12+"k"},28:{O:"L",1l:0,s:0,I:3.13+"k",z:3.12+"k"}};3.l.U("17");3.26=e m("p",{T:3.5.T||""}).c({O:"29"}).n(3.15=e m("p").n(3.1g=e m("p").n(3.1C=e m("p",{T:"1n"}).c(V.1f({3g:"22"},A.1E)))));9(3.f){3.15.U("f")}9(3.W){3.15.U("W")}9(3.5.1S){3.1C.n(3.K=e m("p",{T:"K"}).c(A.L));9(3.5.21){3.K.c({Z:3.5.21})}9(3.5.o){3.K.x=3.K.Y()}3.R(3.K,3.j,(1b.P&&P.1B))}3.1C.n(3.r=e m("p",{T:"r"}).c(A.L)).n(e m("p").c(A.L).n(3.16=e m("p").c(A.1E)));9(3.5.1z){3.r.c({Z:3.5.1z})}9(3.5.o){3.r.x=3.r.Y()}3.5.1n.1r(a(B){b C;3.16.n(C=e m("p").c(V.1f({Z:"3a("+3.1G+") 1l s 38-37",s:3.13*B+"k"},A.28)));C.c({s:3.13*B+"k"});9(h.1R){C.c({Z:"35",34:"33:32.30.2Z(v=\'"+3.1G+"\'\', 2Y=\'2X\')"})}}.t(3));3.M=[];3.5.M.1r(a(D){b C,B=3.5.1W?3.X-3.14*(D+1):3.14*D;3.16.n(C=e m("p").c({O:"L",1l:0,s:B+"k",I:3.14+(18.19.1m?1:0)+"k",z:3.12+"k"}));C.y=3.1i*D+3.1i;3.M.1h(C)}.t(3));3.R(3.r,3.j);3.l.1Z(3.26);3.1x={};$w("j u f 1d q").G(a(B){3.l.n(3.1x[B]=e m("2W",{2V:"22",3f:3.J+"1v"+B,1U:""+(B=="1d"?!!3[B]:3[B])}))}.t(3));9(3.5.Q){3.1g.n(3.Q=e m("p",{T:"Q"}));3.1D()}9(!3.W){3.2o()}},1T:a(A){9(3.f&&3.5.1O){3.j=(3.q*3.j-3.f)/(3.q-1||1)}b B=3.f?3.q:3.q++;3.j=(3.j==0)?A:(3.j*(3.f?B-1:B)+A)/(3.f?B:B+1)},1D:a(){3.Q.1Z(e 2T(3.5.Q).2S({u:3.5.u,q:3.q,j:(3.j*10).2R()/10}))},11:a(B){b A=(3.X-(B/3.1i)*3.14);i 1s(3.5.1W?A.2Q():-1*A.3o())},R:a(A,B){9(3.5.o&&3["1I"+A.x]){P.2P.2M(A.x).3s(3["1I"+A.x])}b D=3.11(B);9(1K[2]){b C=1s(A.3t("s")),F=3.11(B);9(C==F){i}b E=((3.2c-(C-F).1H()).1H()/3.2d.1H()).2J(2);3["1I"+A.x]=e P.1B(A,{3w:{s:D+"k"},3x:{O:"3y",2G:1,x:A.x},2f:(3.5.2f*E)})}1u{A.c({s:D+"k"})}},2E:a(C){b B=C.l();9(!B.y){i}3.1T(B.y);9(3.5.Q){3.1D()}9(3.5.1S){3.R(3.K,3.j,(1b.P&&P.1B))}9(!3.f){3.15.U("f")}3.1d=!!3.f;3.f=B.y;9(!3.5.1O){3.2h();3.15.U("W");3.2m(C)}b A={};$w("j J u f 1d q").G(a(D){9(D!="J"){3.1x[D].1U=3[D]}A[D]=3[D]}.t(3));3.5.2C(3.l,A);3.l.1J("17:f",A)},2m:a(A){3.R(3.r,3.j,(3.5.o&&3.5.o.H));3.1N=1P;9(3.5.1k){3.1g.2z(3.5.1k)}9(3.5.1M){3.r.c({Z:3.5.1z})}3.l.1J("17:s")},3J:a(B){b A=B.l();9(!A.y){i}3.R(3.r,A.y,(3.5.o&&3.5.o.S));9(!3.1N&&3.5.1k){3.1g.U(3.5.1k)}3.1N=25;9(3.5.1M){3.r.c({Z:3.5.1M})}3.l.1J("17:3L",{Y:3.5.J,u:3.5.u,y:A.y,q:3.q})}});',62,234,'|||this||options||||if|function|var|setStyle||new|rated||Starboxes|return|average|px|element|Element|insert|effect|div|total|colorbar|left|bind|max|src||scope|rating|height|||||||each|mouseout|width|identity|ghost|absolute|buttons|buildQueue|position|Effect|indicator|setBarPosition|mouseover|className|addClassName|Object|locked|boxWidth|identify|background||getBarPosition|starHeight|starWidth|buttonWidth|status|starbar|starbox|Prototype|Browser|processBuildQueue|window|click|rerated|imageInfo|extend|hover|push|buttonRating|on|hoverClass|top|IE|stars|require|getCachedImage|convertVersionString|times|parseInt|useEvent|else|_|imageSource|inputs|overlayImages|color|buildBatch|Morph|wrapper|updateIndicator|base|imagecache|starSrc|abs|activeEffect_|fire|arguments|_cached|hoverColor|hovered|rerate|false|observe|fixIE|ghosting|updateAverage|value|build|inverse|fullsrc|load|update|REQUIRED_|ghostColor|hidden|overlay|cacheBuildBatch|true|container|batchLoading|star|relative|queueBuild|replace|maxPosition|zeroPosition|capture|duration|counter|disable|cursor|find|invoke|id|onMouseout|capitalize|enable|js|clone|parseFloat|initialize|create|exec|Class|Starbox|MSIE|loaded|removeClassName|dom|RegExp|onRate|document|onClick|member|limit|select|relatedTarget|toFixed|indexOf|isElement|get|wrap|length|Queues|ceil|round|evaluate|Template|mouseleave|type|input|scale|sizingMethod|AlphaImageLoader|Microsoft|requires|DXImageTransform|progid|filter|none|Lightview|repeat|no|onload|url|Image|throw|without|Version|name|overflow|undefined|test|typeof|https|REQUIRED_Scriptaculous|REQUIRED_Prototype|cacheImage|floor|match|writeAttribute|while|remove|getStyle|auto|stopObserving|style|queue|end|starbox_|pointer|do|callee|bindAsEventListener|readAttribute|script|Scriptaculous|userAgent|navigator|onMouseover|head|changed'.split('|'),0,{}));