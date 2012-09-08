Array.prototype.seen = function (obj) {
  if (obj.type == 'notification') {
    var i = 0;
    while (this[i].noticeId != obj.noticeId && i < this.length)
      i++;
    return (i < this.length && this[i].seqN < obj.seqN);
  }
  
  return false;
}
