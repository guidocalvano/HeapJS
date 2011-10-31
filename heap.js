function Heap() {} ;


Heap.prototype.init = function()
	{
	 this.elementSet = [] ;
	
	 this.nextInsert = 0 ;
	
	 return this ;
	} ;
	


Heap.prototype.add = function( element )
	{
	 this.elementSet[ this.nextInsert ] = element ;
	
	 this._bubbleUp( this.nextInsert ) ;
	 
	 this.nextInsert++ ;
	} ;
	
	

Heap.prototype.next = function()
	{
	 if( this.nextInsert == 0 ) return null ;
		
	 var returnMe = this.elementSet[ 0 ] ;

	 --this.nextInsert ;

	 this.elementSet[ 0 ] = this.elementSet[ this.nextInsert  ] ;
	
	 delete this.elementSet[ this.nextInsert ] ;

	 this._bubbleDown( 0 ) ;

	 return returnMe ;
	} ;
	

Heap.prototype.hasNext = function() { return this.nextInsert != 0 ; } ;

	
Heap.prototype._bubbleDown = function( i )	
	{
	 var childSet ;
	
	 var lowestChild ;
	
	 while( true )
		{
		 childSet = this._childrenOf( i ) ;
		
		 if( childSet[ 0 ] >= this.nextInsert ) return ;
	
		 lowestChild = ( childSet[ 1 ]  >= this.nextInsert || this.elementSet[ childSet[ 0 ] ].lowerThan( this.elementSet[ childSet[ 1 ] ] )  ) ? childSet[ 0 ] : childSet[ 1 ] ;
	
		 if( this.elementSet[ i ].lowerThan( this.elementSet[ lowestChild ] ) ) return ;
	
		 this._swap( i, lowestChild ) ;
	
		 i = lowestChild ;
		}
	} ;


Heap.prototype._bubbleUp = function( i )
	{
	 var parent ;
	
	 while( true )
		{
		 parent = this._parentOf( i ) ;
		
		 if( parent < 0 ) return ;
		
		 if( this.elementSet[ i ].lowerThan( this.elementSet[ parent ] ) )
			{
			 this._swap( i, parent ) ;
			 i = parent ;
			}
		 else return ;
		}
	} ;


	
Heap.prototype._swap = function( i, j)
	{
	 var swap = this.elementSet[ i ] ;
	
	 this.elementSet[ i ] = this.elementSet[ j ] ;
	 this.elementSet[ j ] = swap ;
	} ;
	
	
Heap.prototype._parentOf = function( child ) 			 { return Math.floor( ( child - 1 ) / 2 ) ; } ;

Heap.prototype._childrenOf  = function( parent ) 
	{
	 var offset = ( parent * 2 ) + 1 ;
	
	 return [ offset, offset + 1 ] ;
 	} ;

Heap.prototype._testPrint = function( i, depth )
	{
	 var line = '' ;
	
	 for( var j = 0 ; j < depth ; j++ ) line += '\t' ;
	
	 console.log( line + this.elementSet[ i ] ) ;
	
	 var childSet = this._childrenOf( i ) ;
	
	 if( childSet[ 0 ] < this.nextInsert ) this._testPrint( childSet[ 0 ], depth + 1 ) ;
	 if( childSet[ 1 ] < this.nextInsert ) this._testPrint( childSet[ 1 ], depth + 1 ) ;
	}

function Number() {} ;

Number.prototype.init = function( value ) { this.value = value ; return this ; } ;
Number.prototype.lowerThan = function( that ) { return this.value < that.value ; } ;

Number.prototype.toString = function() { return '' + this.value ; } ;

exports.Heap = Heap ;
exports.Number = Number ;


